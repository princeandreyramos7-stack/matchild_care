import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Baby, HeartPulse, ShieldCheck, Save } from "lucide-react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

const Field = ({ label, children, error }) => (
    <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
            {label}
        </label>
        {children}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const Input = ({ value, ...props }) => (
    <input
        {...props}
        value={value ?? ""}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${
            props.className ?? ""
        }`}
    />
);

const Select = ({ value, ...props }) => (
    <select
        {...props}
        value={value ?? ""}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${
            props.className ?? ""
        }`}
    />
);

const Section = ({ icon: Icon, title, description, children }) => (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start gap-3">
            <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-slate-900">
                    {title}
                </h3>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
        </div>

        {children}
    </div>
);

const defaultImmunization = {
    bcg: "",
    hepatitis_b: "",

    pentavalent_1: "",
    pentavalent_2: "",
    pentavalent_3: "",

    opv_1: "",
    opv_2: "",
    opv_3: "",

    ipv_1: "",
    ipv_2: "",

    pcv_1: "",
    pcv_2: "",
    pcv_3: "",

    mmr_1: "",
    mmr_2: "",

    fully_immunized_child: "",
};

export default function Create({ records = [], children = [] }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash?.toast_key]);

    const { data, setData, post, processing, errors } = useForm({
        mode: "existing",

        child_id: "",
        child_last_name: "",
        child_first_name: "",
        child_middle_initial: "",
        child_sex: "",
        child_date_of_birth: "",

        maternal_record_id: "",
        date_of_registration: "",
        family_serial: "",
        mother_name: "",
        address: "",

        immunization: defaultImmunization,
    });

    const updateNested = (group, field, value) => {
        setData(group, {
            ...data[group],
            [field]: value,
        });
    };

    const resetChildFields = (mode) => {
        setData({
            ...data,
            mode,
            child_id: "",
            child_last_name: "",
            child_first_name: "",
            child_middle_initial: "",
            child_sex: "",
            child_date_of_birth: "",
            maternal_record_id: "",
            date_of_registration: "",
            family_serial: "",
            mother_name: "",
            address: "",
            immunization: defaultImmunization,
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("child.immunization.store"), {
            preserveScroll: true,
            onError: () => {
                toast.error("Please check the form fields.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                        Child Immunization Record
                    </h2>
                    <p className="text-sm text-slate-500">
                        Select an existing child or register a new child, then
                        encode vaccine records.
                    </p>
                </div>
            }
        >
            <Head title="Child Immunization Record" />
            <Toaster richColors position="bottom-right" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-purple-50/40 py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-br from-violet-700 to-purple-700 p-6 text-white shadow-xl shadow-violet-100">
                        <div className="flex items-center gap-4">
                            <div className="rounded-2xl bg-white/15 p-4">
                                <HeartPulse className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    Maternal and Child Care System
                                </h1>
                                <p className="mt-1 text-sm text-violet-100">
                                    Child immunization encoding form
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <Section
                            icon={Baby}
                            title="Child Information"
                            description="Select an existing child or encode a new child record."
                        >
                            <div className="mb-5 inline-flex rounded-2xl border border-violet-100 bg-violet-50 p-1">
                                {[
                                    ["existing", "Select Existing Child"],
                                    ["new", "Enter New Child"],
                                ].map(([value, label]) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => resetChildFields(value)}
                                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                            data.mode === value
                                                ? "bg-white text-violet-700 shadow-sm"
                                                : "text-slate-500 hover:text-violet-700"
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {data.mode === "existing" ? (
                                    <Field
                                        label="Select Child"
                                        error={errors.child_id}
                                    >
                                        <Select
                                            value={data.child_id}
                                            onChange={(e) => {
                                                const id = e.target.value;

                                                const selected = children.find(
                                                    (child) =>
                                                        String(child.id) ===
                                                        String(id),
                                                );

                                                setData({
                                                    ...data,
                                                    mode: "existing",
                                                    child_id: id ?? "",

                                                    child_last_name:
                                                        selected?.last_name ??
                                                        "",
                                                    child_first_name:
                                                        selected?.first_name ??
                                                        "",
                                                    child_middle_initial:
                                                        selected?.middle_initial ??
                                                        "",
                                                    child_sex:
                                                        selected?.sex ?? "",
                                                    child_date_of_birth:
                                                        selected?.date_of_birth ??
                                                        "",

                                                    maternal_record_id:
                                                        selected?.maternal_record_id ??
                                                        "",
                                                    date_of_registration:
                                                        selected?.date_of_registration ??
                                                        "",
                                                    family_serial:
                                                        selected?.family_serial ??
                                                        "",
                                                    mother_name:
                                                        selected?.mother_name ??
                                                        "",
                                                    address:
                                                        selected?.address ?? "",

                                                    immunization: {
                                                        ...defaultImmunization,
                                                        ...(selected?.immunization ??
                                                            {}),
                                                    },
                                                });
                                            }}
                                        >
                                            <option value="">
                                                Select child
                                            </option>
                                            {children.map((child) => (
                                                <option
                                                    key={child.id}
                                                    value={child.id}
                                                >
                                                    {child.label}
                                                </option>
                                            ))}
                                        </Select>
                                    </Field>
                                ) : (
                                    <Field
                                        label="Select Mother / Maternal Record"
                                        error={errors.maternal_record_id}
                                    >
                                        <Select
                                            value={data.maternal_record_id}
                                            onChange={(e) => {
                                                const id = e.target.value;

                                                const selected = records.find(
                                                    (record) =>
                                                        String(record.id) ===
                                                        String(id),
                                                );

                                                setData({
                                                    ...data,
                                                    mode: "new",
                                                    maternal_record_id:
                                                        id ?? "",
                                                    date_of_registration:
                                                        selected?.date_of_registration ??
                                                        "",
                                                    family_serial:
                                                        selected?.family_serial ??
                                                        "",
                                                    mother_name:
                                                        selected?.mother_name ??
                                                        "",
                                                    address:
                                                        selected?.address ?? "",
                                                });
                                            }}
                                        >
                                            <option value="">
                                                Select mother
                                            </option>
                                            {records.map((record) => (
                                                <option
                                                    key={record.id}
                                                    value={record.id}
                                                >
                                                    {record.label}
                                                </option>
                                            ))}
                                        </Select>
                                    </Field>
                                )}

                                <Field label="Date of Registration">
                                    <Input
                                        value={data.date_of_registration}
                                        readOnly
                                        className="bg-slate-50"
                                    />
                                </Field>

                                <Field label="Family Serial No.">
                                    <Input
                                        value={data.family_serial}
                                        readOnly
                                        className="bg-slate-50"
                                    />
                                </Field>

                                <Field label="Mother Name">
                                    <Input
                                        value={data.mother_name}
                                        readOnly
                                        className="bg-slate-50"
                                    />
                                </Field>

                                <Field
                                    label="Child Last Name"
                                    error={errors.child_last_name}
                                >
                                    <Input
                                        value={data.child_last_name}
                                        readOnly={data.mode === "existing"}
                                        className={
                                            data.mode === "existing"
                                                ? "bg-slate-50"
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "child_last_name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Last name"
                                    />
                                </Field>

                                <Field
                                    label="Child First Name"
                                    error={errors.child_first_name}
                                >
                                    <Input
                                        value={data.child_first_name}
                                        readOnly={data.mode === "existing"}
                                        className={
                                            data.mode === "existing"
                                                ? "bg-slate-50"
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "child_first_name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="First name"
                                    />
                                </Field>

                                <Field
                                    label="Middle Initial"
                                    error={errors.child_middle_initial}
                                >
                                    <Input
                                        value={data.child_middle_initial}
                                        readOnly={data.mode === "existing"}
                                        className={
                                            data.mode === "existing"
                                                ? "bg-slate-50"
                                                : ""
                                        }
                                        maxLength={2}
                                        onChange={(e) =>
                                            setData(
                                                "child_middle_initial",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="M.I."
                                    />
                                </Field>

                                <Field label="Sex" error={errors.child_sex}>
                                    <Select
                                        value={data.child_sex}
                                        disabled={data.mode === "existing"}
                                        className={
                                            data.mode === "existing"
                                                ? "bg-slate-50"
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData("child_sex", e.target.value)
                                        }
                                    >
                                        <option value="">Select sex</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </Select>
                                </Field>

                                <Field
                                    label="Date of Birth"
                                    error={errors.child_date_of_birth}
                                >
                                    <Input
                                        type="date"
                                        value={data.child_date_of_birth}
                                        readOnly={data.mode === "existing"}
                                        className={
                                            data.mode === "existing"
                                                ? "bg-slate-50"
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "child_date_of_birth",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </Field>

                                <div className="md:col-span-2 lg:col-span-3">
                                    <Field label="Complete Address">
                                        <textarea
                                            value={data.address ?? ""}
                                            readOnly
                                            rows="2"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none"
                                        />
                                    </Field>
                                </div>
                            </div>
                        </Section>

                        <Section
                            icon={ShieldCheck}
                            title="Child Immunization"
                            description="Record vaccine dates and fully immunized child status."
                        >
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {[
                                    ["bcg", "BCG"],
                                    ["hepatitis_b", "Hepatitis B"],
                                    ["pentavalent_1", "Pentavalent 1"],
                                    ["pentavalent_2", "Pentavalent 2"],
                                    ["pentavalent_3", "Pentavalent 3"],
                                    ["opv_1", "OPV 1"],
                                    ["opv_2", "OPV 2"],
                                    ["opv_3", "OPV 3"],
                                    ["ipv_1", "IPV 1"],
                                    ["ipv_2", "IPV 2"],
                                    ["pcv_1", "PCV 1"],
                                    ["pcv_2", "PCV 2"],
                                    ["pcv_3", "PCV 3"],
                                    ["mmr_1", "MMR 1"],
                                    ["mmr_2", "MMR 2"],
                                ].map(([field, label]) => (
                                    <Field
                                        key={field}
                                        label={label}
                                        error={errors[`immunization.${field}`]}
                                    >
                                        <Input
                                            type="date"
                                            value={data.immunization[field]}
                                            onChange={(e) =>
                                                updateNested(
                                                    "immunization",
                                                    field,
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </Field>
                                ))}

                                <Field
                                    label="Fully Immunized Child"
                                    error={
                                        errors[
                                            "immunization.fully_immunized_child"
                                        ]
                                    }
                                >
                                    <Select
                                        value={
                                            data.immunization
                                                .fully_immunized_child
                                        }
                                        onChange={(e) =>
                                            updateNested(
                                                "immunization",
                                                "fully_immunized_child",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="">Select status</option>
                                        <option value="Y">Yes</option>
                                        <option value="N">No</option>
                                    </Select>
                                </Field>
                            </div>
                        </Section>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-2xl bg-violet-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                <Save className="h-4 w-4" />
                                {processing ? "Saving..." : "Save Record"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

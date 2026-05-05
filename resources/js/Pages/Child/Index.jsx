import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Plus,
    Baby,
    Eye,
    CalendarDays,
    MapPin,
    UserRound,
    ShieldCheck,
} from "lucide-react";

const StatusBadge = ({ value }) => {
    const isComplete = value === "Y";

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                isComplete
                    ? "bg-green-50 text-green-700 ring-green-100"
                    : "bg-amber-50 text-amber-700 ring-amber-100"
            }`}
        >
            {isComplete ? "Fully Immunized" : "Incomplete"}
        </span>
    );
};

export default function Index({ records = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-800">
                            Child Immunization
                        </h2>
                        <p className="text-sm text-slate-500">
                            Manage child vaccine records and immunization
                            status.
                        </p>
                    </div>

                    <Link
                        href={route("child.immunization.create")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
                    >
                        <Plus className="h-4 w-4" />
                        New Record
                    </Link>
                </div>
            }
        >
            <Head title="Child Immunization" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-purple-50/30 py-8 lg:py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-br from-violet-700 to-purple-700 p-6 text-white shadow-xl shadow-violet-100">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="rounded-2xl bg-white/15 p-4">
                                    <Baby className="h-7 w-7" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        Child Immunization Records
                                    </h1>
                                    <p className="mt-1 text-sm text-violet-100">
                                        View registered children and update
                                        their vaccine records.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white/15 px-4 py-3 text-sm">
                                <span className="font-semibold">
                                    {records.length}
                                </span>{" "}
                                child record{records.length === 1 ? "" : "s"}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
                        <div className="border-b border-violet-100 px-6 py-5">
                            <h3 className="text-base font-semibold text-slate-900">
                                Children List
                            </h3>
                            <p className="text-sm text-slate-500">
                                Select a child to view or continue encoding
                                immunization details.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] text-left text-sm">
                                <thead>
                                    <tr className="border-b border-violet-100 bg-violet-50/80 text-xs uppercase tracking-wide text-violet-700">
                                        <th className="px-6 py-4">Child</th>
                                        <th className="px-6 py-4">Mother</th>
                                        <th className="px-6 py-4">
                                            Family Serial
                                        </th>
                                        <th className="px-6 py-4">Birthdate</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Address</th>
                                        <th className="px-6 py-4 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {records.length > 0 ? (
                                        records.map((record) => (
                                            <tr
                                                key={record.id}
                                                className="transition hover:bg-violet-50/50"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                                                            <Baby className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-800">
                                                                {record.child_name ??
                                                                    "—"}
                                                            </p>
                                                            <p className="text-xs text-slate-500">
                                                                Sex:{" "}
                                                                {record.sex ??
                                                                    "—"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-slate-700">
                                                        <UserRound className="h-4 w-4 text-slate-400" />
                                                        {record.mother_name ??
                                                            "—"}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-100">
                                                        {record.family_serial ??
                                                            "—"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-slate-600">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarDays className="h-4 w-4 text-slate-400" />
                                                        {record.date_of_birth ??
                                                            "—"}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <StatusBadge
                                                        value={
                                                            record.fully_immunized
                                                        }
                                                    />
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex max-w-sm items-start gap-2 text-slate-600">
                                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                                                        <span className="line-clamp-2">
                                                            {record.address ??
                                                                "—"}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={route(
                                                            "child.immunization.create",
                                                            record.id,
                                                        )}
                                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-3 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View / Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-6 py-16 text-center"
                                            >
                                                <div className="mx-auto flex max-w-sm flex-col items-center">
                                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100 text-violet-600">
                                                        <ShieldCheck className="h-8 w-8" />
                                                    </div>
                                                    <h3 className="text-base font-semibold text-slate-800">
                                                        No child immunization
                                                        records yet
                                                    </h3>
                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Create a new record to
                                                        start encoding child
                                                        vaccine information.
                                                    </p>
                                                    <Link
                                                        href={route(
                                                            "child.immunization.create",
                                                        )}
                                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-100 transition hover:bg-violet-700"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        New Record
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

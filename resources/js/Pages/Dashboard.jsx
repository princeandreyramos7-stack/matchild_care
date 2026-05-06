import AdminLayout from "@/Layouts/AdminLayout";
import HealthWorkerLayout from "@/Layouts/HealthWorkerLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const MetricCard = ({
    icon,
    badge,
    value,
    label,
    description,
    bgColor = "bg-gray-100",
    badgeColor = "text-gray-600 bg-gray-50",
}) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex items-center justify-between">
                <div className={`rounded-2xl ${bgColor} p-3`}>{icon}</div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${badgeColor}`}
                >
                    {badge}
                </span>
            </div>

            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <h4 className="mt-2 text-sm font-semibold text-gray-700">
                {label}
            </h4>
            <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
    );
};

const RecentRegistrationItem = ({ record }) => {
    return (
        <div className="flex items-start justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div>
                <p className="font-semibold text-gray-900">
                    {record.name ??
                        record.full_name ??
                        `${record.first_name ?? ""} ${
                            record.last_name ?? ""
                        }`.trim() ??
                        "Unnamed Record"}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                    Family Serial: {record.family_serial ?? "—"}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                    Registered:{" "}
                    {record.date_of_registration ??
                        record.created_at ??
                        "No date"}
                </p>
            </div>

            <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                Recent
            </span>
        </div>
    );
};

const TableRow = ({ record }) => {
    const name =
        record.name ??
        record.full_name ??
        `${record.first_name ?? ""} ${record.middle_name ?? ""} ${
            record.last_name ?? ""
        }`.trim();

    return (
        <tr className="transition hover:bg-pink-50/50">
            <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                {record.family_serial ?? "—"}
            </td>

            <td className="px-6 py-4">
                <p className="text-sm font-semibold text-gray-900">
                    {name || "—"}
                </p>
                <p className="text-xs text-gray-500">
                    {record.address ?? "No address"}
                </p>
            </td>

            <td className="px-6 py-4 text-sm text-gray-700">
                {record.age ?? "—"}
            </td>

            <td className="px-6 py-4 text-sm text-gray-700">
                {record.date_of_registration ?? "—"}
            </td>

            <td className="px-6 py-4 text-sm text-gray-700">
                {record.edd ?? record.expected_delivery_date ?? "—"}
            </td>

            <td className="px-6 py-4">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {record.status ?? "Active"}
                </span>
            </td>

            <td className="px-6 py-4 text-right">
                <Link
                    href={route("parent.maternal-care.edit", record.id)}
                    className="inline-flex items-center rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-700"
                >
                    View / Edit
                </Link>
            </td>
        </tr>
    );
};

export default function Dashboard({ stats = {}, records = [] }) {
    const { auth } = usePage().props;

    const Layout = auth.user.roles.includes("admin")
        ? AdminLayout
        : HealthWorkerLayout;

    const userRole = auth.user.roles.includes("admin")
        ? "Admin"
        : "Health Worker";

    const [activeTab, setActiveTab] = useState("overview");
    const [searchQuery, setSearchQuery] = useState("");

    const tableRecords = useMemo(() => {
        if (Array.isArray(records)) return records;
        if (Array.isArray(records?.data)) return records.data;
        if (Array.isArray(stats?.recent_registrations)) {
            return stats.recent_registrations;
        }

        return [];
    }, [records, stats]);

    const filteredRecords = useMemo(() => {
        const query = searchQuery.toLowerCase();

        return tableRecords.filter((record) => {
            const name =
                record.name ??
                record.full_name ??
                `${record.first_name ?? ""} ${record.last_name ?? ""}`;

            return (
                name.toLowerCase().includes(query) ||
                String(record.family_serial ?? "")
                    .toLowerCase()
                    .includes(query) ||
                String(record.age ?? "")
                    .toLowerCase()
                    .includes(query)
            );
        });
    }, [tableRecords, searchQuery]);

    const completionRate =
        stats?.total_records > 0
            ? Math.round(
                  ((stats?.completed_4pnc || 0) / stats.total_records) * 100,
              )
            : 0;

    const activePregnancyRate =
        stats?.total_records > 0
            ? Math.round(
                  ((stats?.active_pregnancies || 0) / stats.total_records) *
                      100,
              )
            : 0;

    return (
        <Layout
            header={
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                    <p className="text-sm text-gray-500">
                        Maternal and child care monitoring overview
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 shadow-xl">
                        <div className="p-8 text-white">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-rose-100">
                                        Welcome back, {userRole}
                                    </p>

                                    <h1 className="text-3xl font-bold">
                                        Hello, {auth.user.name}
                                    </h1>

                                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-rose-100">
                                        Monitor maternal records, active
                                        pregnancies, postnatal care completion,
                                        and recent registrations in one place.
                                    </p>
                                </div>

                                <Link
                                    href={route("parent.maternal-care")}
                                    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-rose-600 shadow-lg transition hover:bg-rose-50"
                                >
                                    Manage Maternal Care
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <MetricCard
                            icon={
                                <svg
                                    className="h-8 w-8 text-indigo-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            }
                            badge="Total"
                            value={stats?.total_records || 0}
                            label="Maternal Records"
                            description="All registered patients"
                            bgColor="bg-indigo-100"
                            badgeColor="text-indigo-600 bg-indigo-50"
                        />

                        <MetricCard
                            icon={
                                <svg
                                    className="h-8 w-8 text-pink-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            }
                            badge="Active"
                            value={stats?.active_pregnancies || 0}
                            label="Active Pregnancies"
                            description="Ongoing care required"
                            bgColor="bg-pink-100"
                            badgeColor="text-pink-600 bg-pink-50"
                        />

                        <MetricCard
                            icon={
                                <svg
                                    className="h-8 w-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            }
                            badge="Complete"
                            value={stats?.completed_4pnc || 0}
                            label="Completed 4PNC"
                            description="Postnatal care finished"
                            bgColor="bg-green-100"
                            badgeColor="text-green-600 bg-green-50"
                        />

                        <MetricCard
                            icon={
                                <svg
                                    className="h-8 w-8 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            }
                            badge="New"
                            value={stats?.this_month || 0}
                            label="This Month"
                            description="New registrations"
                            bgColor="bg-blue-100"
                            badgeColor="text-blue-600 bg-blue-50"
                        />
                    </div>

                    <div className="rounded-2xl bg-white p-2 shadow-sm">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
                                activeTab === "overview"
                                    ? "bg-rose-600 text-white shadow"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            Overview
                        </button>

                        <button
                            onClick={() => setActiveTab("records")}
                            className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
                                activeTab === "records"
                                    ? "bg-rose-600 text-white shadow"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            All Records
                        </button>
                    </div>

                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-5">
                                    <h3 className="text-lg font-bold text-white">
                                        Recent Registrations
                                    </h3>
                                    <p className="text-sm text-indigo-100">
                                        Latest maternal care records
                                    </p>
                                </div>

                                <div className="space-y-4 p-6">
                                    {stats?.recent_registrations?.length > 0 ? (
                                        stats.recent_registrations.map(
                                            (record) => (
                                                <RecentRegistrationItem
                                                    key={record.id}
                                                    record={record}
                                                />
                                            ),
                                        )
                                    ) : (
                                        <div className="py-12 text-center">
                                            <p className="font-semibold text-gray-900">
                                                No recent records yet
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                New registrations will appear
                                                here.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-5">
                                    <h3 className="text-lg font-bold text-white">
                                        Health Insights
                                    </h3>
                                    <p className="text-sm text-pink-100">
                                        Key maternal care indicators
                                    </p>
                                </div>

                                <div className="space-y-5 p-6">
                                    <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm font-semibold text-gray-700">
                                                4PNC Completion Rate
                                            </span>
                                            <span className="text-lg font-bold text-green-600">
                                                {completionRate}%
                                            </span>
                                        </div>

                                        <div className="h-3 rounded-full bg-green-200">
                                            <div
                                                className="h-3 rounded-full bg-green-500"
                                                style={{
                                                    width: `${completionRate}%`,
                                                }}
                                            />
                                        </div>

                                        <p className="mt-2 text-xs text-gray-600">
                                            {stats?.completed_4pnc || 0} of{" "}
                                            {stats?.total_records || 0}{" "}
                                            completed postnatal care.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-pink-200 bg-pink-50 p-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm font-semibold text-gray-700">
                                                Active Pregnancy Rate
                                            </span>
                                            <span className="text-lg font-bold text-pink-600">
                                                {activePregnancyRate}%
                                            </span>
                                        </div>

                                        <div className="h-3 rounded-full bg-pink-200">
                                            <div
                                                className="h-3 rounded-full bg-pink-500"
                                                style={{
                                                    width: `${activePregnancyRate}%`,
                                                }}
                                            />
                                        </div>

                                        <p className="mt-2 text-xs text-gray-600">
                                            {stats?.active_pregnancies || 0}{" "}
                                            ongoing pregnancies requiring care.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                                            <p className="text-xs text-gray-600">
                                                This Month
                                            </p>
                                            <p className="mt-1 text-2xl font-bold text-blue-600">
                                                +{stats?.this_month || 0}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                                            <p className="text-xs text-gray-600">
                                                Pending 4PNC
                                            </p>
                                            <p className="mt-1 text-2xl font-bold text-orange-600">
                                                {(stats?.total_records || 0) -
                                                    (stats?.completed_4pnc ||
                                                        0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "records" && (
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 px-6 py-6">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">
                                            All Maternal Care Records
                                        </h3>
                                        <p className="text-sm text-pink-100">
                                            Complete list of registered patients
                                        </p>
                                    </div>

                                    <a
                                        href={route(
                                            "parent.maternal-care.bulk-pdf",
                                        )}
                                        className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-rose-600 shadow transition hover:bg-rose-50"
                                    >
                                        Download All Records
                                    </a>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Search by name, family serial, or age..."
                                        className="w-full rounded-xl border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 lg:max-w-md"
                                    />
                                </div>

                                <div className="overflow-x-auto rounded-xl border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-rose-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                                                    Family Serial
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                                                    Name
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                                                    Age
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                                                    Registration Date
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                                                    EDD
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-700">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {filteredRecords.length > 0 ? (
                                                filteredRecords.map(
                                                    (record) => (
                                                        <TableRow
                                                            key={record.id}
                                                            record={record}
                                                        />
                                                    ),
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="7"
                                                        className="px-6 py-16 text-center"
                                                    >
                                                        <p className="text-lg font-semibold text-gray-900">
                                                            No records found
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            Try changing your
                                                            search keyword or
                                                            add a new record.
                                                        </p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {records?.data && records.data.length > 0 && (
                                    <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                                        <p className="text-sm text-gray-700">
                                            Showing{" "}
                                            <span className="font-medium">
                                                {records.from || 0}
                                            </span>{" "}
                                            to{" "}
                                            <span className="font-medium">
                                                {records.to || 0}
                                            </span>{" "}
                                            of{" "}
                                            <span className="font-medium">
                                                {records.total || 0}
                                            </span>{" "}
                                            results
                                        </p>

                                        <div className="flex gap-1">
                                            {records.links?.map(
                                                (link, index) => {
                                                    let href = link.url || "#";

                                                    if (
                                                        href !== "#" &&
                                                        !href.includes("tab=")
                                                    ) {
                                                        href +=
                                                            (href.includes("?")
                                                                ? "&"
                                                                : "?") +
                                                            "tab=records";
                                                    }

                                                    return (
                                                        <Link
                                                            key={index}
                                                            href={href}
                                                            className={`rounded-lg border px-3 py-2 text-sm ${
                                                                link.active
                                                                    ? "border-rose-500 bg-rose-50 text-rose-600"
                                                                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                                                            }`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.label,
                                                            }}
                                                        />
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

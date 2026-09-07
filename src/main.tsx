import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
    Activity,
    ArrowDownLeft,
    ArrowLeft,
    ArrowRight,
    BarChart3,
    Bell,
    Check,
    ChevronDown,
    ChevronRight,
    CircleHelp,
    Clock3,
    Download,
    FileCheck2,
    Filter,
    Gift,
    LayoutDashboard,
    Menu,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Search,
    Settings,
    ShieldCheck,
    SlidersHorizontal,
    Sparkles,
    Store,
    Target,
    Ticket,
    TrendingDown,
    TrendingUp,
    Upload,
    UserCheck,
    Users,
    Wallet,
    X,
    Database,
    ClipboardList,
    Megaphone,
    LockKeyhole,
    Globe2,
} from "lucide-react";
import "./index.css";
import type { LucideIcon } from "lucide-react";

type Role = "admin" | "partner" | "member";
type Status =
    | "Active"
    | "Draft"
    | "Completed"
    | "Pending"
    | "Reversed"
    | "Available"
    | "Suspended";

type Scheme = {
    id: number;
    partner: string;
    name: string;
    target: string;
    reward: number;
    participants: number;
    achievement: number;
    pointsIssued: number;
    budget: number;
    start: string;
    end: string;
    status: Status;
};
type Tx = {
    id: number;
    date: string;
    source: string;
    type: string;
    points: number;
    status: Status;
};

const schemes: Scheme[] = [
    {
        id: 1,
        partner: "Jockey",
        name: "Summer Growth Accelerator",
        target: "Purchase 100 units",
        reward: 2500,
        participants: 1284,
        achievement: 82,
        pointsIssued: 320000,
        budget: 250000,
        start: "01 Sep",
        end: "30 Sep",
        status: "Active",
    },
    {
        id: 2,
        partner: "Enamor",
        name: "New Collection Push",
        target: "Purchase ₹1,00,000",
        reward: 3000,
        participants: 642,
        achievement: 67,
        pointsIssued: 192000,
        budget: 300000,
        start: "01 Sep",
        end: "30 Sep",
        status: "Active",
    },
    {
        id: 3,
        partner: "Page Industries",
        name: "Premium SKU Bonus",
        target: "Buy 50 units",
        reward: 1500,
        participants: 421,
        achievement: 91,
        pointsIssued: 126000,
        budget: 180000,
        start: "05 Sep",
        end: "25 Sep",
        status: "Active",
    },
    {
        id: 4,
        partner: "Jockey",
        name: "Festive Store Lift",
        target: "Purchase 200 units",
        reward: 5000,
        participants: 318,
        achievement: 58,
        pointsIssued: 94000,
        budget: 220000,
        start: "10 Sep",
        end: "10 Oct",
        status: "Active",
    },
    {
        id: 5,
        partner: "Enamor",
        name: "Core Range Momentum",
        target: "Purchase ₹75,000",
        reward: 2000,
        participants: 508,
        achievement: 74,
        pointsIssued: 165000,
        budget: 200000,
        start: "15 Aug",
        end: "15 Sep",
        status: "Active",
    },
];

const rewards = [
    {
        id: 1,
        name: "Amazon Shopping Voucher",
        points: 10000,
        value: "₹5,000",
        cat: "Shopping",
        mark: "A",
    },
    {
        id: 2,
        name: "Flipkart Voucher",
        points: 10000,
        value: "₹5,000",
        cat: "Shopping",
        mark: "F",
    },
    {
        id: 3,
        name: "Fuel Voucher",
        points: 8000,
        value: "₹4,000",
        cat: "Fuel",
        mark: "⛽",
    },
    {
        id: 4,
        name: "Myntra Voucher",
        points: 7500,
        value: "₹3,750",
        cat: "Shopping",
        mark: "M",
    },
    {
        id: 5,
        name: "Travel Voucher",
        points: 20000,
        value: "₹10,000",
        cat: "Travel",
        mark: "✈",
    },
    {
        id: 6,
        name: "Electronics Voucher",
        points: 25000,
        value: "₹12,500",
        cat: "Electronics",
        mark: "▣",
    },
    {
        id: 7,
        name: "Dining Voucher",
        points: 6000,
        value: "₹3,000",
        cat: "Dining",
        mark: "⌁",
    },
    {
        id: 8,
        name: "Entertainment Pass",
        points: 9000,
        value: "₹4,500",
        cat: "Entertainment",
        mark: "▶",
    },
];

const initialTx: Tx[] = [
    {
        id: 1,
        date: "02 Sep 2026",
        source: "Jockey",
        type: "Scheme Reward",
        points: 2500,
        status: "Available",
    },
    {
        id: 2,
        date: "01 Sep 2026",
        source: "Enamor",
        type: "Scheme Reward",
        points: 3000,
        status: "Pending",
    },
    {
        id: 3,
        date: "28 Aug 2026",
        source: "Amazon",
        type: "Redemption",
        points: -10000,
        status: "Completed",
    },
    {
        id: 4,
        date: "25 Aug 2026",
        source: "Page Industries",
        type: "SKU Bonus",
        points: 1500,
        status: "Available",
    },
    {
        id: 5,
        date: "20 Aug 2026",
        source: "Jockey",
        type: "Scheme Reward",
        points: 2500,
        status: "Reversed",
    },
];

const adminNav = [
    ["Overview", LayoutDashboard],
    ["Partners", Store],
    ["Members", Users],
    ["Schemes", Target],
    ["Rewards", Gift],
    ["Transactions", Ticket],
    ["Approvals", FileCheck2],
    ["Analytics", BarChart3],
    ["Communications", Megaphone],
    ["Audit Log", ClipboardList],
    ["Settings", Settings],
] as const;
const partnerNav = [
    ["Dashboard", LayoutDashboard],
    ["IQ Points", Wallet],
    ["Schemes", Target],
    ["Members", Users],
    ["Performance", BarChart3],
    ["Rewards", Gift],
    ["Communications", Bell],
    ["Settings", Settings],
] as const;
const memberNav = [
    ["Dashboard", LayoutDashboard],
    ["Schemes", Target],
    ["My Wallet", Wallet],
    ["Rewards", Gift],
    ["Transactions", Ticket],
    ["Profile", Users],
] as const;

function App() {
    const [role, setRole] = useState<Role>("admin");
    const [page, setPage] = useState("Overview");
    const [logged, setLogged] = useState(false);
    const [wallet, setWallet] = useState({
        available: 18450,
        pending: 5950,
        redeemed: 12000,
    });
    const [txs, setTxs] = useState(initialTx);
    const [toast, setToast] = useState("");
    const [modal, setModal] = useState<
        | "points"
        | "purchase"
        | "redeem"
        | "create"
        | "member"
        | "partner"
        | null
    >(null);
    const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
    const [selectedReward, setSelectedReward] = useState<
        (typeof rewards)[0] | null
    >(null);
    const [purchaseSubmitted, setPurchaseSubmitted] = useState(false);
    const [validated, setValidated] = useState(false);
    const notify = (m: string) => {
        setToast(m);
        window.setTimeout(() => setToast(""), 2600);
    };
    const switchRole = (r: Role) => {
        setRole(r);
        setPage(r === "admin" ? "Overview" : "Dashboard");
        setLogged(false);
        setModal(null);
        setSelectedScheme(null);
    };
    const login = () => {
        setLogged(true);
        setPage(role === "admin" ? "Overview" : "Dashboard");
    };
    const approve = () => {
        if (!purchaseSubmitted || validated) return;
        setValidated(true);
        setWallet((w) => ({
            ...w,
            pending: Math.max(0, w.pending - 2500),
            available: w.available + 2500,
        }));
        setTxs((t) =>
            t.map((x) => (x.id === 99 ? { ...x, status: "Available" } : x)),
        );
        notify("Validation complete · 2,500 IQ is now Available");
    };
    const reverse = () => {
        if (!purchaseSubmitted || validated) return;
        setPurchaseSubmitted(false);
        setWallet((w) => ({ ...w, pending: Math.max(0, w.pending - 2500) }));
        setTxs((t) =>
            t.map((x) => (x.id === 99 ? { ...x, status: "Reversed" } : x)),
        );
        notify("Points reversed · incentive integrity protected");
    };
    const redeem = () => {
        if (!selectedReward || wallet.available < selectedReward.points) return;
        setWallet((w) => ({
            ...w,
            available: w.available - selectedReward.points,
            redeemed: w.redeemed + selectedReward.points,
        }));
        setTxs((t) => [
            {
                id: Date.now(),
                date: "04 Sep 2026",
                source: selectedReward!.name,
                type: "Redemption",
                points: -selectedReward!.points,
                status: "Completed",
            },
            ...t,
        ]);
        setModal(null);
        setSelectedReward(null);
        notify("Reward redemption initiated");
    };
    if (!logged)
        return <Login role={role} setRole={switchRole} onLogin={login} />;
    const nav =
        role === "admin"
            ? adminNav
            : role === "partner"
              ? partnerNav
              : memberNav;
    return (
        <div className="min-h-screen bg-[#f4f6fa] text-slate-900">
            <Sidebar
                role={role}
                page={page}
                setPage={setPage}
                switchRole={switchRole}
                nav={nav}
            />
            <div className="ml-[272px] min-h-screen max-[980px]:ml-0">
                <Header role={role} page={page} switchRole={switchRole} />
                <main className="mx-auto max-w-[1540px] px-8 py-7 max-[980px]:px-4">
                    {role === "admin" ? (
                        <AdminContent
                            page={page}
                            setPage={setPage}
                            schemes={schemes}
                            setModal={setModal}
                            notify={notify}
                        />
                    ) : role === "partner" ? (
                        <PartnerContent
                            page={page}
                            setPage={setPage}
                            schemes={schemes}
                            setModal={setModal}
                        />
                    ) : (
                        <MemberContent
                            page={page}
                            setPage={setPage}
                            schemes={schemes}
                            wallet={wallet}
                            txs={txs}
                            setSelectedScheme={setSelectedScheme}
                            setModal={setModal}
                            setSelectedReward={setSelectedReward}
                        />
                    )}
                </main>
            </div>
            {modal === "points" && (
                <PointsModal
                    close={() => setModal(null)}
                    onConfirm={() => {
                        setModal(null);
                        notify("1,000,000 IQ purchased · balance updated");
                    }}
                />
            )}
            {modal === "purchase" && (
                <PurchaseModal
                    close={() => setModal(null)}
                    onSubmit={() => {
                        setPurchaseSubmitted(true);
                        setModal(null);
                        setWallet((w) => ({ ...w, pending: w.pending + 2500 }));
                        setTxs((t) => [
                            {
                                id: 99,
                                date: "04 Sep 2026",
                                source: "Jockey",
                                type: "Summer Growth Scheme",
                                points: 2500,
                                status: "Pending",
                            },
                            ...t,
                        ]);
                        notify("Submission received · 2,500 IQ is On Hold");
                    }}
                />
            )}
            {modal === "redeem" && selectedReward && (
                <RedeemModal
                    reward={selectedReward}
                    wallet={wallet.available}
                    close={() => setModal(null)}
                    confirm={redeem}
                />
            )}
            {modal === "create" && (
                <SchemeBuilder
                    close={() => setModal(null)}
                    publish={() => {
                        setModal(null);
                        notify(
                            "Scheme published · eligibility rules are now live",
                        );
                    }}
                />
            )}
            {modal === "partner" && (
                <PartnerModal
                    close={() => setModal(null)}
                    create={() => {
                        setModal(null);
                        notify("Partner profile created");
                    }}
                />
            )}
            {modal === "member" && (
                <MemberModal
                    close={() => setModal(null)}
                    create={() => {
                        setModal(null);
                        notify("Member added to the network");
                    }}
                />
            )}
            {selectedScheme && (
                <SchemeDetail
                    scheme={selectedScheme}
                    close={() => setSelectedScheme(null)}
                    submit={() => {
                        setSelectedScheme(null);
                        setModal("purchase");
                    }}
                    approve={approve}
                    reverse={reverse}
                    purchaseSubmitted={purchaseSubmitted}
                    validated={validated}
                />
            )}
            {toast && (
                <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-3 rounded-2xl bg-[#0b1220] px-4 py-3 text-sm font-semibold text-white shadow-2xl">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                        <Check size={14} />
                    </span>
                    {toast}
                </div>
            )}
        </div>
    );
}

function Login({
    role,
    setRole,
    onLogin,
}: {
    role: Role;
    setRole: (r: Role) => void;
    onLogin: () => void;
}) {
    return (
        <div className="min-h-screen bg-[#080d18] lg:grid lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(37,99,235,.28),transparent_32%),radial-gradient(circle_at_25%_80%,rgba(14,165,233,.10),transparent_30%)]" />
                <div className="relative flex items-center gap-3">
                    <div className="intiq-mark">IQ</div>
                    <div className="text-2xl font-black tracking-[-.06em] text-white">
                        INTIQ<span className="text-blue-400">.</span>
                    </div>
                </div>
                <div className="relative max-w-2xl pb-10">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-blue-300">
                        <Sparkles size={14} /> Retail incentive infrastructure
                    </div>
                    <h1 className="text-6xl font-black leading-[.98] tracking-[-.065em] text-white">
                        One intelligence layer for every{" "}
                        <span className="text-blue-400">
                            incentive decision.
                        </span>
                    </h1>
                    <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
                        INTIQ connects partners, members, schemes, point
                        economics and rewards into one operational system.
                    </p>
                    <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                        {[
                            ["01", "Partner control"],
                            ["02", "Member wallet"],
                            ["03", "Admin intelligence"],
                        ].map((x) => (
                            <div
                                className="rounded-2xl border border-white/10 bg-white/[.04] p-4"
                                key={x[0]}>
                                <div className="text-[10px] font-bold text-blue-400">
                                    {x[0]}
                                </div>
                                <div className="mt-3 text-xs font-bold text-white">
                                    {x[1]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck size={15} /> Secure demonstration environment ·
                    No live transactions
                </div>
            </div>
            <div className="flex items-center justify-center bg-[#f8fafc] p-6">
                <div className="w-full max-w-[460px]">
                    <div className="mb-9 flex items-center gap-3 lg:hidden">
                        <div className="intiq-mark dark">IQ</div>
                        <div className="text-2xl font-black tracking-[-.06em]">
                            INTIQ<span className="text-blue-600">.</span>
                        </div>
                    </div>
                    <div className="surface-heavy p-8">
                        <div className="mb-7">
                            <div className="eyebrow mb-2">INTIQ Workspace</div>
                            <h2 className="text-3xl font-black tracking-[-.04em]">
                                Welcome back.
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Choose the workspace you want to inspect.
                            </p>
                        </div>
                        <div className="mb-6 grid grid-cols-3 gap-1 rounded-2xl bg-slate-100 p-1">
                            {(
                                [
                                    ["admin", "Admin"],
                                    ["partner", "Partner"],
                                    ["member", "Member"],
                                ] as [Role, string][]
                            ).map(([r, l]) => (
                                <button
                                    key={r}
                                    onClick={() => setRole(r)}
                                    className={`rounded-xl py-2.5 text-xs font-bold ${role === r ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                                    {l}
                                </button>
                            ))}
                        </div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-600">
                            {role === "member"
                                ? "Mobile / Email"
                                : "Business Email"}
                        </label>
                        <input
                            className="input mb-4"
                            defaultValue={
                                role === "admin"
                                    ? "admin@intiq.in"
                                    : role === "partner"
                                      ? "demo@jockey.in"
                                      : "demo.member@intiq.in"
                            }
                        />
                        <label className="mb-1.5 block text-xs font-bold text-slate-600">
                            Password
                        </label>
                        <input
                            className="input mb-6"
                            type="password"
                            defaultValue="password"
                        />
                        <button
                            className="btn-primary w-full py-3.5"
                            onClick={onLogin}>
                            Enter workspace <ArrowRight size={16} />
                        </button>
                        <p className="mt-5 text-center text-[11px] text-slate-400">
                            Demo account · local prototype · no real
                            authentication
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Sidebar({
    role,
    page,
    setPage,
    switchRole,
    nav,
}: {
    role: Role;
    page: string;
    setPage: (p: string) => void;
    switchRole: (r: Role) => void;
    nav: readonly (readonly [string, LucideIcon])[];
}) {
    return (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-[272px] flex-col border-r border-slate-200 bg-white max-[980px]:hidden">
            <div className="flex h-[78px] items-center gap-3 border-b border-slate-100 px-6">
                <div className="intiq-mark dark">IQ</div>
                <div className="text-[22px] font-black tracking-[-.06em]">
                    INTIQ<span className="text-blue-600">.</span>
                </div>
                <span className="ml-auto rounded-md bg-slate-100 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    Prototype
                </span>
            </div>
            <div className="px-4 pt-5">
                <div className="mb-2 px-2 text-[10px] font-black uppercase tracking-[.18em] text-slate-400">
                    Workspace
                </div>
                <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
                    {(
                        [
                            ["admin", "Admin"],
                            ["partner", "Partner"],
                            ["member", "Member"],
                        ] as [Role, string][]
                    ).map(([r, l]) => (
                        <button
                            key={r}
                            onClick={() => switchRole(r)}
                            className={`rounded-lg py-2 text-[10px] font-black ${role === r ? "bg-white shadow-sm text-slate-900" : "text-slate-400"}`}>
                            {l}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-5 flex-1 overflow-y-auto px-3">
                <div className="px-3 pb-2 text-[10px] font-black uppercase tracking-[.18em] text-slate-400">
                    {role === "admin"
                        ? "Control centre"
                        : role === "partner"
                          ? "Partner workspace"
                          : "Member workspace"}
                </div>
                {nav.map(([label, Icon]) => (
                    <button
                        key={label}
                        onClick={() => setPage(label)}
                        className={`group mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${page === label ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
                        <Icon
                            size={17}
                            className={
                                page === label
                                    ? "text-blue-300"
                                    : "text-slate-400 group-hover:text-slate-600"
                            }
                        />
                        {label}
                        {label === "Approvals" && (
                            <span className="ml-auto rounded-md bg-amber-100 px-1.5 py-0.5 text-[9px] font-black text-amber-700">
                                12
                            </span>
                        )}
                        {page === label && (
                            <ChevronRight
                                size={14}
                                className="ml-auto opacity-50"
                            />
                        )}
                    </button>
                ))}
            </div>
            <div className="border-t border-slate-100 p-4">
                <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white">
                            {role === "admin"
                                ? "IA"
                                : role === "partner"
                                  ? "JP"
                                  : "AM"}
                        </div>
                        <div className="min-w-0">
                            <div className="truncate text-xs font-black">
                                {role === "admin"
                                    ? "INTIQ Admin"
                                    : role === "partner"
                                      ? "Jockey Partner"
                                      : "Amit Mehta"}
                            </div>
                            <div className="text-[10px] text-slate-400">
                                {role === "admin"
                                    ? "Platform owner"
                                    : role === "partner"
                                      ? "Enterprise workspace"
                                      : "Retail member"}
                            </div>
                        </div>
                        <MoreHorizontal
                            size={15}
                            className="ml-auto text-slate-400"
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
}

function Header({
    role,
    page,
    switchRole,
}: {
    role: Role;
    page: string;
    switchRole: (r: Role) => void;
}) {
    return (
        <header className="sticky top-0 z-30 flex h-[78px] items-center border-b border-slate-200/80 bg-white/90 px-8 backdrop-blur-xl max-[980px]:px-4">
            <div className="flex items-center gap-3">
                <button className="hidden rounded-xl border border-slate-200 p-2 max-[980px]:block">
                    <Menu size={18} />
                </button>
                <div>
                    <div className="text-[10px] font-black uppercase tracking-[.18em] text-slate-400">
                        {role === "admin"
                            ? "Platform operations"
                            : role === "partner"
                              ? "Partner operations"
                              : "Member account"}
                    </div>
                    <div className="mt-0.5 text-sm font-black">{page}</div>
                </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400 md:flex">
                    <Search size={14} />
                    <span>Search anything</span>
                    <kbd className="ml-4 rounded bg-white px-1.5 py-0.5 text-[9px] font-bold shadow-sm">
                        ⌘ K
                    </kbd>
                </div>
                <button className="icon-btn">
                    <CircleHelp size={17} />
                </button>
                <button className="icon-btn relative">
                    <Bell size={17} />
                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                </button>
                <div className="mx-1 h-7 w-px bg-slate-200" />
                <button
                    onClick={() => switchRole(role)}
                    className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold sm:flex">
                    <div className="h-5 w-5 rounded-md bg-slate-900 text-center text-[9px] leading-5 text-white">
                        {role[0].toUpperCase()}
                    </div>
                    {role === "admin" ? "Admin" : "Workspace"}
                    <ChevronDown size={13} />
                </button>
            </div>
        </header>
    );
}

function AdminContent({
    page,
    setPage,
    schemes,
    setModal,
    notify,
}: {
    page: string;
    setPage: any;
    schemes: Scheme[];
    setModal: any;
    notify: (m: string) => void;
}) {
    if (page === "Overview")
        return <AdminOverview setPage={setPage} notify={notify} />;
    if (page === "Partners") return <AdminPartners setModal={setModal} />;
    if (page === "Members") return <AdminMembers setModal={setModal} />;
    if (page === "Schemes")
        return (
            <AdminSchemes
                schemes={schemes}
                setModal={setModal}
                partnerOnly="Jockey"
            />
        );
    if (page === "Rewards") return <AdminRewards />;
    if (page === "Transactions") return <AdminTransactions />;
    if (page === "Approvals") return <AdminApprovals notify={notify} />;
    if (page === "Analytics") return <AdminAnalytics />;
    if (page === "Communications")
        return <AdminCommunications notify={notify} />;
    if (page === "Audit Log") return <AdminAudit />;
    return <AdminSettings />;
}

function AdminOverview({ setPage, notify }: { setPage: any; notify: any }) {
    return (
        <>
            <PageTitle
                eyebrow="INTIQ / Platform control"
                title="Good morning, Admin."
                sub="A single operational view across partners, members, incentives and IQ economics."
                action={
                    <button
                        className="btn-secondary"
                        onClick={() => notify("Dashboard refreshed")}>
                        <RefreshCw size={15} /> Refresh data
                    </button>
                }
            />
            <div className="grid grid-cols-4 gap-4 max-[1150px]:grid-cols-2 max-[600px]:grid-cols-1">
                {[
                    ["Gross IQ Issued", "8.42M", "+14.8%", Wallet, true],
                    ["Active Partners", "38", "+6 this quarter", Store, true],
                    ["Active Members", "18,642", "+12.4%", Users, true],
                    ["Redemption Rate", "68.4%", "+4.2 pts", Gift, true],
                ].map(([a, b, c, I, ,], i) => (
                    <MetricCard
                        key={String(a)}
                        label={String(a)}
                        value={String(b)}
                        sub={String(c)}
                        icon={I as any}
                        positive={i !== 3}
                    />
                ))}
            </div>
            <div className="mt-5 grid grid-cols-[1.55fr_.85fr] gap-5 max-[1100px]:grid-cols-1">
                <div className="surface-heavy p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="eyebrow mb-2">Platform pulse</div>
                            <h2 className="text-lg font-black">
                                IQ issuance & redemption
                            </h2>
                            <p className="mt-1 text-xs text-slate-400">
                                Last 30 days · all workspaces
                            </p>
                        </div>
                        <button className="btn-secondary text-xs">
                            30 days <ChevronDown size={13} />
                        </button>
                    </div>
                    <div className="mt-6">
                        <MiniBars />
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                        {[
                            ["Issued", "1.84M IQ"],
                            ["Redeemed", "1.12M IQ"],
                            ["Net active", "720K IQ"],
                        ].map((x) => (
                            <div
                                className="rounded-xl bg-slate-50 p-3"
                                key={x[0]}>
                                <div className="text-[10px] font-bold text-slate-400">
                                    {x[0]}
                                </div>
                                <div className="mt-1 text-sm font-black">
                                    {x[1]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="surface-heavy p-6">
                    <div className="eyebrow mb-2">Attention queue</div>
                    <h2 className="text-lg font-black">What needs action</h2>
                    <div className="mt-5 space-y-3">
                        {([
                            [
                                "Approvals",
                                "12 transactions awaiting validation",
                                "amber",
                                FileCheck2,
                            ],
                            [
                                "Partner KYC",
                                "3 profiles need review",
                                "blue",
                                UserCheck,
                            ],
                            [
                                "Low balance",
                                "4 partners below 15% reserve",
                                "red",
                                Wallet,
                            ],
                            [
                                "System health",
                                "All services operational",
                                "green",
                                Activity,
                            ],
                        ] as const).map(([a, b, c, I]) => (
                            <div
                                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
                                key={String(a)}>
                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${c === "amber" ? "bg-amber-50 text-amber-600" : c === "blue" ? "bg-blue-50 text-blue-600" : c === "red" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                                    <I size={16} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-xs font-black">
                                        {a}
                                    </div>
                                    <div className="truncate text-[10px] text-slate-400">
                                        {b}
                                    </div>
                                </div>
                                <ChevronRight
                                    size={14}
                                    className="text-slate-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-5 grid grid-cols-[1.2fr_.8fr] gap-5 max-[1100px]:grid-cols-1">
                <div className="surface-heavy overflow-hidden">
                    <TableHead
                        title="Top performing partners"
                        eyebrow="Commercial health"
                        action={
                            <button
                                onClick={() => setPage("Partners")}
                                className="text-xs font-bold text-blue-600">
                                View all{" "}
                                <ArrowRight className="inline" size={13} />
                            </button>
                        }
                    />
                    <div className="divide-y divide-slate-100">
                        {[
                            [
                                "Jockey",
                                "14 active schemes",
                                "92.4%",
                                "1.84M IQ",
                            ],
                            ["Enamor", "9 active schemes", "86.7%", "1.21M IQ"],
                            [
                                "Page Industries",
                                "6 active schemes",
                                "81.3%",
                                "940K IQ",
                            ],
                            ["Amante", "5 active schemes", "78.9%", "680K IQ"],
                        ].map((r, i) => (
                            <div
                                className="flex items-center gap-4 px-6 py-4"
                                key={r[0]}>
                                <div className="rank">{i + 1}</div>
                                <div className="flex-1">
                                    <div className="text-sm font-black">
                                        {r[0]}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                        {r[1]}
                                    </div>
                                </div>
                                <div className="hidden text-right sm:block">
                                    <div className="text-xs font-black">
                                        {r[2]}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                        achievement
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-black">
                                        {r[3]}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                        issued
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="surface-dark p-6">
                    <div className="eyebrow text-slate-500">
                        Admin intelligence
                    </div>
                    <h2 className="mt-2 text-2xl font-black tracking-[-.04em] text-white">
                        The network is getting healthier.
                    </h2>
                    <p className="mt-3 text-xs leading-6 text-slate-400">
                        Partner activation is up 12.4% while redemption friction
                        has fallen for the third consecutive week.
                    </p>
                    <div className="mt-7 flex items-center gap-2 text-xs font-bold text-emerald-300">
                        <TrendingUp size={15} /> +18.7% network engagement
                    </div>
                    <button
                        onClick={() => setPage("Analytics")}
                        className="mt-7 w-full rounded-xl bg-white px-4 py-3 text-xs font-black text-slate-900">
                        Open intelligence centre{" "}
                        <ArrowRight className="ml-2 inline" size={14} />
                    </button>
                </div>
            </div>
        </>
    );
}

function AdminPartners({ setModal }: { setModal: any }) {
    const rows = [
        ["Jockey", "Enterprise", "14", "4,286", "92.4%", "Active"],
        ["Enamor", "Enterprise", "9", "2,104", "86.7%", "Active"],
        ["Page Industries", "Enterprise", "6", "1,842", "81.3%", "Active"],
        ["Amante", "Growth", "5", "1,126", "78.9%", "Active"],
        ["Clovia", "Growth", "4", "842", "71.6%", "Pending"],
    ];
    return (
        <>
            <PageTitle
                eyebrow="Network management"
                title="Partners"
                sub="Onboard, monitor and govern every partner connected to the INTIQ network."
                action={
                    <button
                        className="btn-primary"
                        onClick={() => setModal("partner")}>
                        <Plus size={16} /> Add Partner
                    </button>
                }
            />
            <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
                <MetricCard
                    label="Total Partners"
                    value="38"
                    sub="32 active · 3 pending"
                    icon={Store}
                />
                <MetricCard
                    label="Partner-funded IQ"
                    value="8.42M"
                    sub="+14.8% this month"
                    icon={Wallet}
                    positive
                />
                <MetricCard
                    label="Avg. Achievement"
                    value="84.2%"
                    sub="Across active schemes"
                    icon={TrendingUp}
                    positive
                />
            </div>
            <div className="surface-heavy mt-5 overflow-hidden">
                <TableHead
                    title="Partner directory"
                    eyebrow="38 accounts"
                    action={
                        <button className="btn-secondary text-xs">
                            <Filter size={13} /> Filter
                        </button>
                    }
                />
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400">
                            <tr>
                                {[
                                    "Partner",
                                    "Tier",
                                    "Schemes",
                                    "Members",
                                    "Achievement",
                                    "Status",
                                    "",
                                ].map((x) => (
                                    <th className="px-6 py-3" key={x}>
                                        {x}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r) => (
                                <tr
                                    className="border-t border-slate-100"
                                    key={r[0]}>
                                    {r.map((x, i) => (
                                        <td
                                            className={`px-6 py-4 ${i === 0 ? "font-black" : "text-slate-500"}`}
                                            key={i}>
                                            {i === 5 ? (
                                                <StatusPill text={x} />
                                            ) : (
                                                x
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4">
                                        <MoreHorizontal
                                            size={16}
                                            className="text-slate-400"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

function AdminMembers({ setModal }: { setModal: any }) {
    const rows = [
        ["Apex Retail Group", "Mumbai", "184", "42,840 IQ", "92%", "Active"],
        ["Shree Laxmi Stores", "Pune", "162", "38,210 IQ", "88%", "Active"],
        ["Metro Intimates", "Delhi", "128", "31,450 IQ", "86%", "Active"],
        ["Comfort Hub", "Bengaluru", "96", "22,840 IQ", "79%", "Active"],
        [
            "Lifestyle Innerwear",
            "Ahmedabad",
            "84",
            "18,620 IQ",
            "74%",
            "Suspended",
        ],
    ];
    return (
        <>
            <PageTitle
                eyebrow="Network management"
                title="Members"
                sub="Control the member network, activation and incentive participation."
                action={
                    <button
                        className="btn-primary"
                        onClick={() => setModal("member")}>
                        <Plus size={16} /> Add Member
                    </button>
                }
            />
            <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                {[
                    ["Total Members", "18,642", Users],
                    ["Active", "17,218", "user"],
                    ["Avg. Wallet", "12,840 IQ", Wallet],
                    ["Activation", "92.3%", TrendingUp],
                ].map((x, i) => (
                    <MetricCard
                        key={String(x[0])}
                        label={String(x[0])}
                        value={String(x[1])}
                        sub={i === 1 ? "92.4% of network" : "vs previous month"}
                        icon={typeof x[2] === "string" ? Users : (x[2] as any)}
                        positive={i === 3}
                    />
                ))}
            </div>
            <div className="surface-heavy mt-5 overflow-hidden">
                <TableHead
                    title="Member groups"
                    eyebrow="Highest activity"
                    action={
                        <button className="btn-secondary text-xs">
                            <Download size={13} /> Export
                        </button>
                    }
                />
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400">
                            <tr>
                                {[
                                    "Member group",
                                    "Location",
                                    "Locations",
                                    "Wallet balance",
                                    "Achievement",
                                    "Status",
                                ].map((x) => (
                                    <th className="px-6 py-3" key={x}>
                                        {x}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r) => (
                                <tr
                                    className="border-t border-slate-100"
                                    key={r[0]}>
                                    {r.map((x, i) => (
                                        <td
                                            className={`px-6 py-4 ${i === 0 ? "font-black" : "text-slate-500"}`}
                                            key={i}>
                                            {i === 5 ? (
                                                <StatusPill text={x} />
                                            ) : (
                                                x
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

function AdminSchemes({
    schemes,
    setModal,
    partnerOnly,
}: {
    schemes: Scheme[];
    setModal: any;
    partnerOnly?: string;
}) {
    const visibleSchemes = partnerOnly
        ? schemes.filter((s) => s.partner === partnerOnly)
        : schemes;
    return (
        <>
            <PageTitle
                eyebrow="Incentive engine"
                title="Schemes"
                sub="Platform-wide visibility into every partner incentive programme."
                action={
                    <button
                        className="btn-primary"
                        onClick={() => setModal("create")}>
                        <Plus size={16} /> Create Scheme
                    </button>
                }
            />
            <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                {[
                    ["Active schemes", "42", Target],
                    ["IQ committed", "4.82M", Wallet],
                    ["Participants", "8,924", Users],
                    ["Avg. achievement", "82.4%", TrendingUp],
                ].map((x, i) => (
                    <MetricCard
                        key={String(x[0])}
                        label={String(x[0])}
                        value={String(x[1])}
                        sub={i === 3 ? "+6.2 pts" : "Across active programmes"}
                        icon={x[2] as any}
                        positive={i === 3}
                    />
                ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 max-[950px]:grid-cols-1">
                {visibleSchemes.map((s) => (
                    <div className="surface-heavy p-5" key={s.id}>
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                                    {s.partner}
                                </div>
                                <h3 className="mt-1 text-base font-black">
                                    {s.name}
                                </h3>
                                <p className="mt-1 text-xs text-slate-400">
                                    {s.start} — {s.end} · {s.target}
                                </p>
                            </div>
                            <StatusPill text={s.status} />
                        </div>
                        <div className="mt-6 grid grid-cols-4 gap-3">
                            {[
                                ["Members", s.participants.toLocaleString()],
                                ["Achievement", `${s.achievement}%`],
                                [
                                    "Issued",
                                    `${(s.pointsIssued / 1000).toFixed(0)}K`,
                                ],
                                ["Budget", `${(s.budget / 1000).toFixed(0)}K`],
                            ].map((x) => (
                                <div key={x[0]}>
                                    <div className="text-[10px] font-bold text-slate-400">
                                        {x[0]}
                                    </div>
                                    <div className="mt-1 text-sm font-black">
                                        {x[1]}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 h-1.5 rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-blue-600"
                                style={{ width: `${s.achievement}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function AdminRewards() {
    return (
        <>
            <PageTitle
                eyebrow="Catalogue governance"
                title="Rewards"
                sub="Manage the unified reward catalogue, denomination economics and fulfilment health."
                action={
                    <button className="btn-primary">
                        <Plus size={16} /> Add Reward
                    </button>
                }
            />
            <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
                <MetricCard
                    label="Live rewards"
                    value="86"
                    sub="Across 9 categories"
                    icon={Gift}
                />
                <MetricCard
                    label="Redemptions / month"
                    value="4,218"
                    sub="+11.6% vs August"
                    icon={Ticket}
                    positive
                />
                <MetricCard
                    label="Fulfilment SLA"
                    value="97.8%"
                    sub="Within 48 hours"
                    icon={Clock3}
                    positive
                />
            </div>
            <div className="mt-5 grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                {rewards.map((r) => (
                    <div className="surface-heavy p-4" key={r.id}>
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50 text-xl font-black">
                            {r.mark}
                        </div>
                        <div className="mt-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                            {r.cat}
                        </div>
                        <h3 className="mt-1 text-sm font-black">{r.name}</h3>
                        <div className="mt-3 flex justify-between text-xs">
                            <span className="font-black">
                                {r.points.toLocaleString()} IQ
                            </span>
                            <span className="text-slate-400">{r.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function AdminTransactions() {
    return (
        <>
            <PageTitle
                eyebrow="Ledger"
                title="Transactions"
                sub="Every IQ movement, redemption and validation event across the platform."
                action={
                    <button className="btn-secondary">
                        <Download size={14} /> Export ledger
                    </button>
                }
            />
            <div className="surface-heavy overflow-hidden">
                <TableHead
                    title="Global IQ ledger"
                    eyebrow="Live event stream"
                    action={
                        <div className="flex gap-2">
                            <button className="btn-secondary text-xs">
                                <Filter size={13} /> Filters
                            </button>
                            <button className="btn-secondary text-xs">
                                <RefreshCw size={13} /> Sync
                            </button>
                        </div>
                    }
                />
                <TxTable
                    txs={initialTx.concat([
                        {
                            id: 6,
                            date: "04 Sep 2026",
                            source: "Enamor",
                            type: "Scheme Reward",
                            points: 5000,
                            status: "Pending",
                        },
                    ])}
                />
            </div>
        </>
    );
}
function AdminApprovals({ notify }: { notify: any }) {
    const [done, setDone] = useState<number[]>([]);
    const rows = [
        [
            101,
            "Jockey",
            "Apex Retail Group",
            "INV-2026-08421",
            "+2,500 IQ",
            "2 min ago",
        ],
        [
            102,
            "Enamor",
            "Shree Laxmi Stores",
            "INV-2026-08391",
            "+3,000 IQ",
            "8 min ago",
        ],
        [
            103,
            "Page Industries",
            "Metro Intimates",
            "INV-2026-08374",
            "+1,500 IQ",
            "14 min ago",
        ],
        [
            104,
            "Jockey",
            "Comfort Hub",
            "INV-2026-08311",
            "+2,500 IQ",
            "22 min ago",
        ],
    ];
    return (
        <>
            <PageTitle
                eyebrow="Risk & validation"
                title="Approvals"
                sub="Review transactions before IQ becomes available to members."
                action={
                    <button className="btn-secondary">
                        <SlidersHorizontal size={14} /> Rules
                    </button>
                }
            />
            <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
                <MetricCard
                    label="Pending review"
                    value="12"
                    sub="4 high priority"
                    icon={Clock3}
                />
                <MetricCard
                    label="Auto-approved"
                    value="94.8%"
                    sub="Rule engine confidence"
                    icon={ShieldCheck}
                    positive
                />
                <MetricCard
                    label="Reversed today"
                    value="7"
                    sub="₹38,500 equivalent"
                    icon={TrendingDown}
                />
            </div>
            <div className="surface-heavy mt-5 overflow-hidden">
                <TableHead
                    title="Validation queue"
                    eyebrow="Oldest first"
                    action={
                        <span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-black text-amber-700">
                            12 pending
                        </span>
                    }
                />
                {rows.map((r) => {
                    const complete = done.includes(r[0] as number);
                    return (
                        <div
                            className="flex items-center gap-4 border-t border-slate-100 px-6 py-4 max-[800px]:flex-wrap"
                            key={r[0]}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <FileCheck2 size={17} />
                            </div>
                            <div className="min-w-[180px] flex-1">
                                <div className="text-sm font-black">
                                    {r[1]} · {r[2]}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                    {r[3]} · {r[5]}
                                </div>
                            </div>
                            <div className="text-xs font-black">{r[4]}</div>
                            <div className="flex gap-2">
                                <button
                                    disabled={complete}
                                    onClick={() => {
                                        setDone((d) => [...d, r[0] as number]);
                                        notify("Transaction approved");
                                    }}
                                    className="rounded-xl bg-emerald-600 px-3 py-2 text-[11px] font-black text-white disabled:opacity-40">
                                    {complete ? "Approved" : "Approve"}
                                </button>
                                <button
                                    onClick={() =>
                                        notify(
                                            "Transaction flagged for manual review",
                                        )
                                    }
                                    className="rounded-xl border border-red-200 px-3 py-2 text-[11px] font-black text-red-600">
                                    Flag
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function AdminAnalytics() {
    return (
        <>
            <PageTitle
                eyebrow="Intelligence centre"
                title="Analytics"
                sub="Measure network growth, partner performance and the economics of IQ."
                action={
                    <button className="btn-secondary">
                        <Download size={14} /> Export report
                    </button>
                }
            />
            <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
                <MetricCard
                    label="Network GMV influenced"
                    value="₹18.6 Cr"
                    sub="+21.4% month-on-month"
                    icon={TrendingUp}
                    positive
                />
                <MetricCard
                    label="Incremental uplift"
                    value="18.7%"
                    sub="vs matched baseline"
                    icon={BarChart3}
                    positive
                />
                <MetricCard
                    label="Cost / incremental ₹"
                    value="₹0.038"
                    sub="Improving 8.2%"
                    icon={Activity}
                    positive
                />
            </div>
            <div className="mt-5 grid grid-cols-[1.4fr_.6fr] gap-5 max-[1050px]:grid-cols-1">
                <div className="surface-heavy p-6">
                    <div className="eyebrow mb-2">Network trend</div>
                    <h2 className="text-lg font-black">Engagement index</h2>
                    <div className="mt-7">
                        <LineChart />
                    </div>
                </div>
                <div className="surface-heavy p-6">
                    <div className="eyebrow mb-2">Mix</div>
                    <h2 className="text-lg font-black">IQ by partner tier</h2>
                    <div className="mt-8 space-y-5">
                        {[
                            ["Enterprise", "62%"],
                            ["Growth", "27%"],
                            ["Emerging", "11%"],
                        ].map((x) => (
                            <div key={x[0]}>
                                <div className="mb-2 flex justify-between text-xs">
                                    <span className="font-bold">{x[0]}</span>
                                    <b>{x[1]}</b>
                                </div>
                                <div className="h-2 rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-slate-900"
                                        style={{ width: x[1] }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 rounded-xl bg-blue-50 p-4 text-xs leading-5 text-blue-800">
                        <b>Signal:</b> Enterprise partners generate 2.4× higher
                        member retention than the network median.
                    </div>
                </div>
            </div>
        </>
    );
}

function AdminCommunications({ notify }: { notify: any }) {
    return (
        <>
            <PageTitle
                eyebrow="Engagement layer"
                title="Communications"
                sub="Coordinate launches, reminders and operational messaging across the network."
                action={
                    <button
                        className="btn-primary"
                        onClick={() => notify("Campaign composer opened")}>
                        <Plus size={16} /> New campaign
                    </button>
                }
            />
            <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
                {([
                    ["Active campaigns", "8", "+2 this week", Megaphone],
                    ["Open rate", "74.8%", "+5.2 pts", Activity],
                    ["Members reached", "14,842", "81% of network", Users],
                ] as const).map((x) => (
                    <MetricCard
                        key={x[0]}
                        label={x[0]}
                        value={x[1]}
                        sub={x[2]}
                        icon={x[3]}
                        positive
                    />
                ))}
            </div>
            <div className="surface-heavy mt-5 overflow-hidden">
                <TableHead
                    title="Campaigns"
                    eyebrow="Recently active"
                    action={
                        <button className="btn-secondary text-xs">
                            <Filter size={13} /> Filter
                        </button>
                    }
                />
                {[
                    [
                        "Festive Store Lift",
                        "Jockey",
                        "Push + WhatsApp",
                        "Live",
                        "82%",
                    ],
                    [
                        "New Collection Push",
                        "Enamor",
                        "Email + SMS",
                        "Live",
                        "71%",
                    ],
                    [
                        "September activation",
                        "INTIQ",
                        "In-app",
                        "Scheduled",
                        "—",
                    ],
                    ["Wallet education", "INTIQ", "Email", "Draft", "—"],
                ].map((r) => (
                    <div
                        className="grid grid-cols-[1.4fr_.7fr_1fr_.5fr_.4fr] items-center gap-4 border-t border-slate-100 px-6 py-4 text-xs max-[800px]:grid-cols-2"
                        key={r[0]}>
                        <div>
                            <div className="font-black">{r[0]}</div>
                            <div className="text-[10px] text-slate-400">
                                {r[1]}
                            </div>
                        </div>
                        <span className="text-slate-500">{r[2]}</span>
                        <span>
                            <StatusPill text={r[3]} />
                        </span>
                        <b>{r[4]}</b>
                        <MoreHorizontal size={16} className="text-slate-400" />
                    </div>
                ))}
            </div>
        </>
    );
}
function AdminAudit() {
    return (
        <>
            <PageTitle
                eyebrow="Governance"
                title="Audit Log"
                sub="A tamper-aware activity trail for platform administration and incentive operations."
                action={
                    <button className="btn-secondary">
                        <Download size={14} /> Export log
                    </button>
                }
            />
            <div className="surface-heavy overflow-hidden">
                <TableHead
                    title="Recent administrative events"
                    eyebrow="Last 24 hours"
                    action={
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
                            Live
                        </span>
                    }
                />
                {[
                    [
                        "10:24",
                        "Admin",
                        "Approved transaction #TX-10482",
                        "Jockey · +2,500 IQ",
                    ],
                    [
                        "09:58",
                        "System",
                        "Auto-validated invoice #INV-08391",
                        "Enamor · rule R-12",
                    ],
                    [
                        "09:41",
                        "Admin",
                        "Updated partner eligibility",
                        "Page Industries · scheme #SC-018",
                    ],
                    [
                        "09:16",
                        "Admin",
                        "Created reward denomination",
                        "Amazon · 10,000 IQ",
                    ],
                    [
                        "08:52",
                        "System",
                        "Nightly reconciliation complete",
                        "8.42M IQ ledger checked",
                    ],
                ].map((r) => (
                    <div
                        className="flex items-center gap-5 border-t border-slate-100 px-6 py-4"
                        key={r[0]}>
                        <div className="w-14 text-[10px] font-bold text-slate-400">
                            {r[0]}
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                            <Activity size={14} />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs font-black">{r[2]}</div>
                            <div className="text-[10px] text-slate-400">
                                {r[3]}
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">
                            {r[1]}
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}
function AdminSettings() {
    return (
        <>
            <PageTitle
                eyebrow="Platform configuration"
                title="Settings"
                sub="Configure governance, security, point economics and system defaults."
            />
            <div className="grid grid-cols-[.8fr_1.2fr] gap-5 max-[1000px]:grid-cols-1">
                <div className="surface-heavy p-5 space-y-1">
                    {([
                        ["General", Globe2],
                        ["Security", LockKeyhole],
                        ["Point economics", Wallet],
                        ["Notifications", Bell],
                        ["Integrations", Database],
                    ] as const).map(([x, I], i) => (
                        <button
                            className={`flex w-full items-center gap-3 rounded-xl p-3 text-sm font-bold ${i === 0 ? "bg-slate-900 text-white" : "hover:bg-slate-50"}`}
                            key={String(x)}>
                            <I size={16} />
                            {x}
                            <ChevronRight className="ml-auto" size={14} />
                        </button>
                    ))}
                </div>
                <div className="surface-heavy p-6">
                    <div className="eyebrow mb-2">General</div>
                    <h2 className="text-lg font-black">Platform defaults</h2>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <Field label="Platform name" value="INTIQ" />
                        <Field label="Point currency" value="IQ Points" />
                        <Field
                            label="Default validation window"
                            value="48 hours"
                        />
                        <Field label="Default member status" value="Active" />
                    </div>
                    <div className="mt-6 border-t border-slate-100 pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-black">
                                    Require manual approval
                                </div>
                                <div className="mt-1 text-xs text-slate-400">
                                    Apply to high-value or anomalous
                                    transactions.
                                </div>
                            </div>
                            <div className="toggle on">
                                <span />
                            </div>
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                            <div>
                                <div className="text-sm font-black">
                                    Fraud signal monitoring
                                </div>
                                <div className="mt-1 text-xs text-slate-400">
                                    Continuously score purchase submissions.
                                </div>
                            </div>
                            <div className="toggle on">
                                <span />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function PartnerContent({
    page,
    setPage,
    schemes,
    setModal,
}: {
    page: string;
    setPage: any;
    schemes: Scheme[];
    setModal: any;
}) {
    if (page === "Dashboard")
        return <PartnerDashboard setPage={setPage} schemes={schemes} />;
    if (page === "IQ Points") return <BrandPoints setModal={setModal} />;
    if (page === "Schemes")
        return (
            <AdminSchemes
                schemes={schemes}
                setModal={setModal}
                partnerOnly="Jockey"
            />
        );
    if (page === "Members") return <AdminMembers setModal={setModal} />;
    if (page === "Performance") return <AdminAnalytics />;
    if (page === "Rewards") return <AdminRewards />;
    return <EmptyPage title={page} role="Partner" />;
}
function PartnerDashboard({
    setPage,
    schemes,
}: {
    setPage: any;
    schemes: Scheme[];
}) {
    return (
        <>
            <PageTitle
                eyebrow="Jockey · Partner workspace"
                title="Good morning, Jockey."
                sub="Monitor scheme performance, IQ allocation and member activation."
                action={
                    <button
                        className="btn-primary"
                        onClick={() => setPage("Schemes")}>
                        <Plus size={16} /> Create scheme
                    </button>
                }
            />
            <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                <MetricCard
                    label="IQ balance"
                    value="1.25M"
                    sub="Available to allocate"
                    icon={Wallet}
                />
                <MetricCard
                    label="Active schemes"
                    value="14"
                    sub="3 ending this month"
                    icon={Target}
                />
                <MetricCard
                    label="Participating members"
                    value="1,284"
                    sub="+8.4% this month"
                    icon={Users}
                    positive
                />
                <MetricCard
                    label="Achievement"
                    value="82.4%"
                    sub="+6.2 pts vs August"
                    icon={TrendingUp}
                    positive
                />
            </div>
            <div className="mt-5 grid grid-cols-[1.3fr_.7fr] gap-5 max-[1050px]:grid-cols-1">
                <div className="surface-heavy p-6">
                    <div className="eyebrow mb-2">Programme performance</div>
                    <h2 className="text-lg font-black">
                        Active scheme achievement
                    </h2>
                    <div className="mt-6 space-y-5">
                        {schemes.slice(0, 4).map((s) => (
                            <div key={s.id}>
                                <div className="mb-2 flex justify-between">
                                    <span className="text-xs font-bold">
                                        {s.name}
                                    </span>
                                    <b className="text-xs">{s.achievement}%</b>
                                </div>
                                <div className="h-2 rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-blue-600"
                                        style={{ width: `${s.achievement}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="surface-dark p-6">
                    <div className="eyebrow text-slate-500">
                        Member economics
                    </div>
                    <h2 className="mt-2 text-2xl font-black text-white">
                        ₹18.7L
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                        incremental sales influenced this month
                    </p>
                    <div className="mt-8 rounded-2xl bg-white/5 p-4">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-400">ROI</span>
                            <b className="text-emerald-300">4.8×</b>
                        </div>
                        <div className="mt-3 flex justify-between text-xs">
                            <span className="text-slate-400">Redemption</span>
                            <b className="text-white">71.2%</b>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
function BrandPoints({ setModal }: { setModal: any }) {
    return (
        <>
            <PageTitle
                eyebrow="Capital"
                title="IQ Points"
                sub="Fund, allocate and monitor the points powering your member incentives."
                action={
                    <button
                        onClick={() => setModal("points")}
                        className="btn-primary">
                        <Plus size={16} /> Purchase IQ Points
                    </button>
                }
            />
            <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
                <MetricCard
                    label="Current balance"
                    value="1.25M IQ"
                    sub="Available to allocate"
                    icon={Wallet}
                />
                <MetricCard
                    label="Purchased"
                    value="2.00M IQ"
                    sub="Lifetime"
                    icon={ArrowDownLeft}
                />
                <MetricCard
                    label="Allocated"
                    value="750K IQ"
                    sub="Across active schemes"
                    icon={Target}
                />
            </div>
            <div className="surface-heavy mt-5 overflow-hidden">
                <TableHead
                    title="Point history"
                    eyebrow="Activity"
                    action={
                        <button className="btn-secondary text-xs">
                            <Download size={13} /> Export
                        </button>
                    }
                />
                <TxTable txs={initialTx} />
            </div>
        </>
    );
}

function MemberContent({
    page,
    setPage,
    schemes,
    wallet,
    txs,
    setSelectedScheme,
    setModal,
    setSelectedReward,
}: {
    page: string;
    setPage: any;
    schemes: Scheme[];
    wallet: any;
    txs: Tx[];
    setSelectedScheme: any;
    setModal: any;
    setSelectedReward: any;
}) {
    if (page === "Dashboard")
        return (
            <MemberDashboard
                wallet={wallet}
                schemes={schemes}
                setPage={setPage}
                setSelectedScheme={setSelectedScheme}
            />
        );
    if (page === "Schemes")
        return (
            <MemberSchemes
                schemes={schemes}
                setSelectedScheme={setSelectedScheme}
            />
        );
    if (page === "My Wallet") return <WalletPage wallet={wallet} txs={txs} />;
    if (page === "Rewards")
        return (
            <RewardsPage
                wallet={wallet}
                setSelectedReward={setSelectedReward}
                setModal={setModal}
            />
        );
    if (page === "Transactions") return <Transactions txs={txs} />;
    return <EmptyPage title={page} role="Member" />;
}
function MemberDashboard({
    wallet,
    schemes,
    setPage,
    setSelectedScheme,
}: {
    wallet: any;
    schemes: Scheme[];
    setPage: any;
    setSelectedScheme: any;
}) {
    return (
        <>
            <PageTitle
                eyebrow="Apex Retail · Mumbai"
                title="Good morning, Amit."
                sub="Your retail incentive activity, all in one place."
            />
            <div className="grid grid-cols-[1.35fr_1fr] gap-5 max-[1000px]:grid-cols-1">
                <div className="surface-dark p-7 text-white">
                    <div className="flex items-center justify-between">
                        <div className="eyebrow text-slate-500">
                            My IQ Wallet
                        </div>
                        <div className="rounded-xl bg-white/10 p-2">
                            <Wallet size={18} />
                        </div>
                    </div>
                    <div className="mt-5 text-5xl font-black tracking-[-.06em]">
                        {wallet.available.toLocaleString()}{" "}
                        <span className="text-xl text-blue-300">IQ</span>
                    </div>
                    <div className="mt-2 text-sm text-slate-400">
                        ≈ ₹
                        {Math.round(wallet.available / 2).toLocaleString(
                            "en-IN",
                        )}{" "}
                        reward value
                    </div>
                    <div className="mt-7 flex gap-2">
                        <button
                            onClick={() => setPage("Rewards")}
                            className="btn-primary bg-white text-slate-900 hover:bg-slate-100">
                            Redeem <ArrowRight size={15} />
                        </button>
                        <button
                            onClick={() => setPage("My Wallet")}
                            className="btn-secondary border-white/10 bg-white/10 text-white">
                            View wallet
                        </button>
                    </div>
                </div>
                <div className="surface-heavy p-6">
                    <div className="eyebrow mb-2">Wallet snapshot</div>
                    <h2 className="text-lg font-black">Your points</h2>
                    <div className="mt-6 space-y-5">
                        {[
                            ["Available", wallet.available, "text-emerald-600"],
                            [
                                "Pending / On Hold",
                                wallet.pending,
                                "text-amber-600",
                            ],
                            ["Redeemed", wallet.redeemed, "text-slate-700"],
                        ].map((x) => (
                            <div
                                className="flex justify-between"
                                key={x[0] as string}>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full bg-current ${x[2]}`}
                                    />
                                    <span className="text-sm text-slate-500">
                                        {x[0]}
                                    </span>
                                </div>
                                <b>{Number(x[1]).toLocaleString()} IQ</b>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 flex items-end justify-between">
                <div>
                    <div className="eyebrow mb-2">Earn more</div>
                    <h2 className="text-xl font-black">Available Schemes</h2>
                </div>
                <button
                    onClick={() => setPage("Schemes")}
                    className="text-xs font-black text-blue-600">
                    View all <ArrowRight className="inline" size={13} />
                </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
                {schemes.slice(0, 3).map((s) => (
                    <SchemeCard
                        key={s.id}
                        s={s}
                        open={() => setSelectedScheme(s)}
                    />
                ))}
            </div>
        </>
    );
}
function SchemeCard({ s, open }: { s: Scheme; open: () => void }) {
    return (
        <div className="surface-heavy p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
            <div className="flex justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                    {s.partner}
                </span>
                <StatusPill text="Active" />
            </div>
            <h3 className="mt-4 text-base font-black">{s.name}</h3>
            <p className="mt-1 text-xs text-slate-400">{s.target}</p>
            <div className="my-5 flex items-end justify-between">
                <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        Earn
                    </div>
                    <div className="mt-1 text-2xl font-black">
                        {s.reward.toLocaleString()}{" "}
                        <span className="text-sm text-blue-600">IQ</span>
                    </div>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                    Ends {s.end}
                </div>
            </div>
            <button onClick={open} className="btn-secondary w-full">
                View scheme <ArrowRight size={14} />
            </button>
        </div>
    );
}
function MemberSchemes({
    schemes,
    setSelectedScheme,
}: {
    schemes: Scheme[];
    setSelectedScheme: any;
}) {
    return (
        <>
            <PageTitle
                eyebrow="Earn IQ Points"
                title="Available Schemes"
                sub="Choose the incentives that fit your store and growth goals."
            />
            <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
                {schemes.map((s) => (
                    <SchemeCard
                        key={s.id}
                        s={s}
                        open={() => setSelectedScheme(s)}
                    />
                ))}
            </div>
        </>
    );
}
function WalletPage({ wallet, txs }: { wallet: any; txs: Tx[] }) {
    return (
        <>
            <PageTitle
                eyebrow="Your balance"
                title="IQ Wallet"
                sub="All earned IQ Points, regardless of which partner scheme generated them."
            />
            <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
                <MetricCard
                    label="Available"
                    value={`${wallet.available.toLocaleString()} IQ`}
                    sub="Ready to redeem"
                    icon={Wallet}
                />
                <MetricCard
                    label="Pending / On Hold"
                    value={`${wallet.pending.toLocaleString()} IQ`}
                    sub="Awaiting validation"
                    icon={Clock3}
                />
                <MetricCard
                    label="Redeemed"
                    value={`${wallet.redeemed.toLocaleString()} IQ`}
                    sub="Lifetime"
                    icon={Gift}
                />
            </div>
            <div className="surface-heavy mt-5 overflow-hidden">
                <TableHead title="Recent activity" eyebrow="Point history" />
                <TxTable txs={txs} />
            </div>
        </>
    );
}
function RewardsPage({
    wallet,
    setSelectedReward,
    setModal,
}: {
    wallet: any;
    setSelectedReward: any;
    setModal: any;
}) {
    const [cat, setCat] = useState("All");
    const cats = [
        "All",
        "Shopping",
        "Fuel",
        "Travel",
        "Dining",
        "Electronics",
        "Entertainment",
    ];
    const visible =
        cat === "All" ? rewards : rewards.filter((r) => r.cat === cat);
    return (
        <>
            <PageTitle
                eyebrow="Unified catalogue"
                title="Rewards"
                sub="Turn your IQ Points into what you actually want."
            />
            <div className="mb-6 flex flex-wrap gap-2">
                {cats.map((c) => (
                    <button
                        key={c}
                        onClick={() => setCat(c)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-black ${cat === c ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-500"}`}>
                        {c}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2 max-[550px]:grid-cols-1">
                {visible.map((r) => (
                    <div className="surface-heavy overflow-hidden" key={r.id}>
                        <div className="flex h-32 items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-xl font-black shadow-sm">
                                {r.mark}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {r.cat}
                            </div>
                            <h3 className="mt-1.5 text-sm font-black">
                                {r.name}
                            </h3>
                            <div className="mt-3 flex justify-between">
                                <b>
                                    {r.points.toLocaleString()}{" "}
                                    <span className="text-xs text-blue-600">
                                        IQ
                                    </span>
                                </b>
                                <span className="text-xs text-slate-400">
                                    {r.value}
                                </span>
                            </div>
                            <button
                                disabled={wallet.available < r.points}
                                onClick={() => {
                                    setSelectedReward(r);
                                    setModal("redeem");
                                }}
                                className={`mt-4 w-full rounded-xl px-3 py-2.5 text-xs font-black ${wallet.available >= r.points ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                                {wallet.available >= r.points
                                    ? "Redeem"
                                    : "Not enough IQ"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
function Transactions({ txs }: { txs: Tx[] }) {
    return (
        <>
            <PageTitle
                eyebrow="Activity"
                title="Transactions"
                sub="A complete view of how IQ Points move through your wallet."
            />
            <div className="surface-heavy overflow-hidden">
                <TableHead title="Transaction history" eyebrow="All activity" />
                <TxTable txs={txs} />
            </div>
        </>
    );
}
function TxTable({ txs }: { txs: Tx[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <tr>
                        {["Date", "Source", "Type", "IQ Points", "Status"].map(
                            (x) => (
                                <th className="px-6 py-3" key={x}>
                                    {x}
                                </th>
                            ),
                        )}
                    </tr>
                </thead>
                <tbody>
                    {txs.map((t) => (
                        <tr className="border-t border-slate-100" key={t.id}>
                            <td className="px-6 py-4 text-slate-500">
                                {t.date}
                            </td>
                            <td className="px-6 py-4 font-black">{t.source}</td>
                            <td className="px-6 py-4 text-slate-500">
                                {t.type}
                            </td>
                            <td
                                className={`px-6 py-4 font-black ${t.points < 0 ? "text-slate-800" : "text-emerald-600"}`}>
                                {t.points > 0 ? "+" : ""}
                                {t.points.toLocaleString()} IQ
                            </td>
                            <td className="px-6 py-4">
                                <StatusPill text={t.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function MetricCard({
    label,
    value,
    sub,
    icon: Icon,
    positive = false,
}: {
    label: string;
    value: string;
    sub: string;
    icon: LucideIcon;
    positive?: boolean;
}) {
    return (
        <div className="surface-heavy p-5">
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {label}
                    </div>
                    <div className="mt-2 text-2xl font-black tracking-[-.04em]">
                        {value}
                    </div>
                    <div
                        className={`mt-1 flex items-center gap-1 text-[10px] font-bold ${positive ? "text-emerald-600" : "text-slate-400"}`}>
                        {positive && <TrendingUp size={11} />} {sub}
                    </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Icon size={17} />
                </div>
            </div>
        </div>
    );
}
function TableHead({
    title,
    eyebrow,
    action,
}: {
    title: string;
    eyebrow: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div>
                <div className="eyebrow mb-1.5">{eyebrow}</div>
                <h2 className="text-base font-black">{title}</h2>
            </div>
            {action}
        </div>
    );
}
function PageTitle({
    eyebrow,
    title,
    sub,
    action,
}: {
    eyebrow: string;
    title: string;
    sub: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="mb-7 flex items-end justify-between gap-5 max-[700px]:items-start max-[700px]:flex-col">
            <div>
                <div className="eyebrow mb-2">{eyebrow}</div>
                <h1 className="text-[32px] font-black tracking-[-.05em]">
                    {title}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    {sub}
                </p>
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}
function StatusPill({ text }: { text: string }) {
    const m: any = {
        Active: "pill-green",
        Available: "pill-green",
        Completed: "pill-slate",
        Pending: "pill-amber",
        Reversed: "pill-red",
        Draft: "pill-slate",
        Suspended: "pill-red",
    };
    return (
        <span className={`status-pill ${m[text] || "pill-slate"}`}>{text}</span>
    );
}
function MiniBars() {
    const vals = [42, 55, 49, 66, 61, 74, 68, 82, 77, 88, 84, 93, 91, 96];
    return (
        <div className="flex h-[210px] items-end gap-2">
            {vals.map((v, i) => (
                <div
                    className="group flex h-full flex-1 flex-col justify-end"
                    key={i}>
                    <div className="mb-1 hidden text-center text-[8px] font-bold text-slate-400 group-hover:block">
                        {v}
                    </div>
                    <div
                        className="w-full rounded-t-md bg-slate-900 transition group-hover:bg-blue-600"
                        style={{ height: `${v}%` }}
                    />
                </div>
            ))}
        </div>
    );
}
function LineChart() {
    return (
        <div className="relative h-[250px]">
            <svg
                viewBox="0 0 800 250"
                className="h-full w-full"
                preserveAspectRatio="none">
                <path
                    d="M0 205 C70 190 75 150 140 168 S210 115 270 132 S340 78 405 105 S470 80 530 88 S600 42 660 60 S735 22 800 38"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-blue-600"
                />
                <path
                    d="M0 205 C70 190 75 150 140 168 S210 115 270 132 S340 78 405 105 S470 80 530 88 S600 42 660 60 S735 22 800 38 L800 250 L0 250Z"
                    fill="currentColor"
                    opacity=".06"
                    className="text-blue-600"
                />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex justify-between text-[9px] font-bold text-slate-400">
                <span>Aug 01</span>
                <span>Aug 08</span>
                <span>Aug 15</span>
                <span>Aug 22</span>
                <span>Aug 29</span>
                <span>Sep 05</span>
            </div>
        </div>
    );
}

function EmptyPage({ title, role }: { title: string; role: string }) {
    return (
        <div className="surface-heavy flex min-h-[520px] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Settings size={22} className="text-slate-500" />
            </div>
            <h2 className="text-xl font-black">{title}</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
                {title} is represented in this prototype shell for the{" "}
                {role.toLowerCase()} workspace.
            </p>
        </div>
    );
}
function Field({ label, value }: { label: string; value: string }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-600">
                {label}
            </span>
            <input className="input" defaultValue={value} />
        </label>
    );
}
function Overlay({
    children,
    close,
}: {
    children: React.ReactNode;
    close: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
            onMouseDown={close}>
            <div
                className="w-full max-w-[620px] rounded-3xl bg-white shadow-2xl"
                onMouseDown={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
function ModalHead({
    title,
    sub,
    close,
}: {
    title: string;
    sub?: string;
    close: () => void;
}) {
    return (
        <div className="flex items-start justify-between border-b border-slate-100 p-6">
            <div>
                <h2 className="text-xl font-black tracking-[-.03em]">
                    {title}
                </h2>
                {sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
            </div>
            <button
                onClick={close}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-50">
                <X size={18} />
            </button>
        </div>
    );
}
function PointsModal({
    close,
    onConfirm,
}: {
    close: () => void;
    onConfirm: () => void;
}) {
    return (
        <Overlay close={close}>
            <ModalHead
                title="Purchase IQ Points"
                sub="Add points to the partner balance for future incentive schemes."
                close={close}
            />
            <div className="space-y-5 p-6">
                <Field label="Quantity" value="1,000,000 IQ" />
                <div className="rounded-2xl bg-slate-50 p-5">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Estimated value
                    </div>
                    <div className="mt-1 text-2xl font-black">₹5,00,000</div>
                </div>
                <button className="btn-primary w-full" onClick={onConfirm}>
                    Confirm purchase <Check size={15} />
                </button>
            </div>
        </Overlay>
    );
}
function PurchaseModal({
    close,
    onSubmit,
}: {
    close: () => void;
    onSubmit: () => void;
}) {
    return (
        <Overlay close={close}>
            <ModalHead
                title="Submit Purchase"
                sub="Upload qualifying purchase details for validation."
                close={close}
            />
            <div className="space-y-4 p-6">
                <Field label="Invoice number" value="INV-2026-08421" />
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Purchase date" value="04 Sep 2026" />
                    <Field label="Quantity" value="100 units" />
                </div>
                <Field label="Purchase value" value="₹85,000" />
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <Upload className="mx-auto text-slate-400" size={22} />
                    <div className="mt-2 text-xs font-black">
                        Invoice attachment
                    </div>
                    <div className="mt-1 text-[10px] text-slate-400">
                        Demo upload surface
                    </div>
                </div>
                <button className="btn-primary w-full" onClick={onSubmit}>
                    Submit for validation <ArrowRight size={15} />
                </button>
            </div>
        </Overlay>
    );
}
function RedeemModal({
    reward,
    wallet,
    close,
    confirm,
}: {
    reward: any;
    wallet: number;
    close: () => void;
    confirm: () => void;
}) {
    return (
        <Overlay close={close}>
            <ModalHead
                title="Confirm redemption"
                sub="Review your reward before confirming."
                close={close}
            />
            <div className="p-6">
                <div className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl font-black">
                            {reward.mark}
                        </div>
                        <div>
                            <h3 className="font-black">{reward.name}</h3>
                            <div className="mt-1 text-sm text-slate-400">
                                Reward value · {reward.value}
                            </div>
                        </div>
                    </div>
                    <div className="my-5 border-t border-slate-100 pt-5 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Redemption</span>
                            <b>{reward.points.toLocaleString()} IQ</b>
                        </div>
                        <div className="mt-2 flex justify-between">
                            <span className="text-slate-500">
                                Current balance
                            </span>
                            <b>{wallet.toLocaleString()} IQ</b>
                        </div>
                        <div className="mt-2 flex justify-between">
                            <b>Remaining</b>
                            <b className="text-blue-600">
                                {(wallet - reward.points).toLocaleString()} IQ
                            </b>
                        </div>
                    </div>
                </div>
                <button onClick={confirm} className="btn-primary mt-5 w-full">
                    Confirm redemption <Check size={15} />
                </button>
            </div>
        </Overlay>
    );
}
function SchemeBuilder({
    close,
    publish,
}: {
    close: () => void;
    publish: () => void;
}) {
    const [step, setStep] = useState(1);
    const steps = ["Basics", "Target", "Reward", "Eligibility", "Review"];
    return (
        <Overlay close={close}>
            <ModalHead
                title="Create incentive scheme"
                sub="Build a production-style incentive in five focused steps."
                close={close}
            />
            <div className="border-b border-slate-100 px-6 py-4">
                <div className="flex items-center justify-between">
                    {steps.map((s, i) => (
                        <div className="flex items-center gap-2" key={s}>
                            <div
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black ${step > i + 1 ? "bg-emerald-500 text-white" : step === i + 1 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                                {step > i + 1 ? <Check size={12} /> : i + 1}
                            </div>
                            <span
                                className={`hidden text-[10px] font-black sm:block ${step === i + 1 ? "text-slate-900" : "text-slate-400"}`}>
                                {s}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="min-h-[320px] p-6">
                {step === 1 && (
                    <div>
                        <div className="eyebrow mb-2">Step 1</div>
                        <h3 className="text-lg font-black">Scheme basics</h3>
                        <div className="mt-5 space-y-3">
                            <Field
                                label="Scheme name"
                                value="Summer Growth Accelerator"
                            />
                            <Field
                                label="Description"
                                value="Accelerate sell-through of the summer collection."
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Start date" value="01 Sep 2026" />
                                <Field label="End date" value="30 Sep 2026" />
                            </div>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <div className="eyebrow mb-2">Step 2</div>
                        <h3 className="text-lg font-black">What qualifies?</h3>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            {["Purchase value", "Units", "SKU", "Category"].map(
                                (x, i) => (
                                    <button
                                        className={`rounded-2xl border p-4 text-left ${i === 1 ? "border-blue-500 bg-blue-50" : "border-slate-200"}`}
                                        key={x}>
                                        <div className="text-sm font-black">
                                            {x}
                                        </div>
                                        <div className="mt-1 text-[10px] text-slate-400">
                                            {i === 1
                                                ? "100 units"
                                                : "Configure target"}
                                        </div>
                                    </button>
                                ),
                            )}
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <div className="eyebrow mb-2">Step 3</div>
                        <h3 className="text-lg font-black">Reward economics</h3>
                        <div className="mt-5 space-y-3">
                            <Field label="IQ points" value="2,500 IQ" />
                            <Field
                                label="Optional milestone bonus"
                                value="+2,500 IQ at 200 units"
                            />
                            <Field
                                label="Maximum scheme budget"
                                value="250,000 IQ"
                            />
                        </div>
                    </div>
                )}
                {step === 4 && (
                    <div>
                        <div className="eyebrow mb-2">Step 4</div>
                        <h3 className="text-lg font-black">
                            Member eligibility
                        </h3>
                        <div className="mt-5 space-y-2">
                            {[
                                "All eligible members",
                                "Selected members",
                                "Region",
                                "Member tier",
                            ].map((x, i) => (
                                <label
                                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-bold"
                                    key={x}>
                                    <input
                                        type={i < 2 ? "radio" : "checkbox"}
                                        name="elig"
                                        defaultChecked={i === 0}
                                    />
                                    {x}
                                    <span className="ml-auto text-[10px] text-slate-400">
                                        {i === 0
                                            ? "1,284 members"
                                            : i === 2
                                              ? "West India"
                                              : "Configure"}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
                {step === 5 && (
                    <div>
                        <div className="eyebrow mb-2">Step 5</div>
                        <h3 className="text-lg font-black">Review & publish</h3>
                        <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-5 text-sm">
                            {[
                                ["Target", "100 units"],
                                ["Reward", "2,500 IQ"],
                                ["Bonus", "+2,500 IQ at 200 units"],
                                ["Eligible", "1,284 members"],
                                ["Budget", "250,000 IQ"],
                            ].map((x) => (
                                <div
                                    className="flex justify-between"
                                    key={x[0]}>
                                    <span className="text-slate-500">
                                        {x[0]}
                                    </span>
                                    <b>{x[1]}</b>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 p-6">
                <button
                    onClick={() => (step > 1 ? setStep(step - 1) : close())}
                    className="btn-secondary">
                    {step === 1 ? (
                        "Cancel"
                    ) : (
                        <>
                            <ArrowLeft size={14} /> Back
                        </>
                    )}
                </button>
                {step < 5 ? (
                    <button
                        onClick={() => setStep(step + 1)}
                        className="btn-primary">
                        Continue <ArrowRight size={14} />
                    </button>
                ) : (
                    <button onClick={publish} className="btn-primary">
                        <Check size={14} /> Publish scheme
                    </button>
                )}
            </div>
        </Overlay>
    );
}
function SchemeDetail({
    scheme,
    close,
    submit,
    approve,
    reverse,
    purchaseSubmitted,
    validated,
}: {
    scheme: Scheme;
    close: () => void;
    submit: () => void;
    approve: () => void;
    reverse: () => void;
    purchaseSubmitted: boolean;
    validated: boolean;
}) {
    const progressPercent = Math.min(
        100,
        Math.round((scheme.achievement / 100) * 100)
    );
    const unitsCompleted = Math.round(
        (scheme.achievement / 100) *
        parseInt(scheme.target.match(/\d+/)?.[0] || "100", 10)
    );
    const targetUnits = parseInt(scheme.target.match(/\d+/)?.[0] || "100", 10);
    const remainingUnits = targetUnits - unitsCompleted;

    return (
        <Overlay close={close}>
            <ModalHead
                title={scheme.name}
                sub={`${scheme.partner} · ${scheme.start} — ${scheme.end}`}
                close={close}
            />
            <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                    {[
                        ["Target", scheme.target],
                        ["Reward", `${scheme.reward.toLocaleString()} IQ`],
                        [
                            "Progress",
                            `${unitsCompleted} / ${targetUnits} units`,
                        ],
                    ].map((x) => (
                        <div className="rounded-2xl bg-slate-50 p-4" key={x[0]}>
                            <div className="text-[10px] font-bold text-slate-400">
                                {x[0]}
                            </div>
                            <div className="mt-1 text-sm font-black">
                                {x[1]}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <div className="mb-2 flex justify-between text-xs font-bold">
                        <span>Current progress</span>
                        <span className="text-slate-400">
                            {remainingUnits} units remaining
                        </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
                <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                    <div className="eyebrow mb-3">Point lifecycle</div>
                    <div className="flex items-center justify-between">
                        {[
                            ["Purchase", true],
                            ["Submitted", purchaseSubmitted],
                            ["On Hold", purchaseSubmitted],
                            ["Validation", validated],
                            ["Available", validated],
                        ].map(([x, on], i) => (
                            <React.Fragment key={String(x)}>
                                <div className="flex flex-col items-center gap-2">
                                    <div
                                        className={`h-8 w-8 rounded-full text-center leading-8 text-[10px] font-black ${on ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                                        {on ? (
                                            <Check
                                                size={13}
                                                className="mx-auto mt-2"
                                            />
                                        ) : (
                                            i + 1
                                        )}
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-500">
                                        {x}
                                    </span>
                                </div>
                                {i < 4 && (
                                    <div
                                        className={`h-px flex-1 ${on ? "bg-emerald-300" : "bg-slate-200"}`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                {purchaseSubmitted && !validated && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs">
                        <b className="text-amber-800">
                            +2,500 IQ · Pending validation
                        </b>
                        <div className="mt-1 text-amber-700">
                            Points are on hold while the transaction is
                            validated.
                        </div>
                    </div>
                )}
                {validated && (
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs">
                        <b className="text-emerald-800">
                            ✓ 2,500 IQ · Available
                        </b>
                        <div className="mt-1 text-emerald-700">
                            Validation completed successfully.
                        </div>
                    </div>
                )}
                <div className="mt-6 flex gap-2">
                    {!purchaseSubmitted ? (
                        <button onClick={submit} className="btn-primary flex-1">
                            Submit purchase <ArrowRight size={14} />
                        </button>
                    ) : !validated ? (
                        <>
                            <button
                                onClick={approve}
                                className="btn-primary flex-1">
                                <ShieldCheck size={15} /> Simulate validation
                            </button>
                            <button
                                onClick={reverse}
                                className="btn-secondary border-red-200 text-red-600">
                                Reverse
                            </button>
                        </>
                    ) : (
                        <button onClick={close} className="btn-primary flex-1">
                            Done <Check size={15} />
                        </button>
                    )}
                </div>
            </div>
        </Overlay>
    );
}
function PartnerModal({
    close,
    create,
}: {
    close: () => void;
    create: () => void;
}) {
    return (
        <Overlay close={close}>
            <ModalHead
                title="Add partner"
                sub="Create a partner workspace and begin onboarding."
                close={close}
            />
            <div className="space-y-4 p-6">
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Partner name" value="New Partner" />
                    <Field label="Tier" value="Growth" />
                </div>
                <Field label="Business email" value="partnerships@partner.in" />
                <Field label="Primary category" value="Intimate apparel" />
                <button className="btn-primary w-full" onClick={create}>
                    Create partner <ArrowRight size={15} />
                </button>
            </div>
        </Overlay>
    );
}
function MemberModal({
    close,
    create,
}: {
    close: () => void;
    create: () => void;
}) {
    return (
        <Overlay close={close}>
            <ModalHead
                title="Add member"
                sub="Create a member record for the INTIQ network."
                close={close}
            />
            <div className="space-y-4 p-6">
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Business name" value="New Member" />
                    <Field label="City" value="Mumbai" />
                </div>
                <Field label="Mobile / email" value="member@retailer.in" />
                <Field label="Member tier" value="Standard" />
                <button className="btn-primary w-full" onClick={create}>
                    Add member <ArrowRight size={15} />
                </button>
            </div>
        </Overlay>
    );
}

createRoot(document.getElementById("root")!).render(<App />);

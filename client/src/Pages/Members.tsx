import AppSidebar from "../Components/AppSideBar";
import { useAppState } from "../Context/AppContext";

const Members = () => {
  const { members, isLoading } = useAppState();

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto w-full max-w-7xl">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Members</h1>
            <p className="text-sm text-gray-600">Workspace members</p>
          </header>

          {isLoading ? (
            <div className="text-center text-gray-500 text-sm py-12">Loading members...</div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="grid grid-cols-3 border-b border-gray-200 px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                <span>Member</span>
                <span>Email</span>
                <span>Role</span>
              </div>
              {members.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-gray-500">No members yet.</div>
              ) : (
                members.map((member) => (
                  <div key={member.id} className="grid grid-cols-3 items-center border-b border-gray-100 px-6 py-4 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                        {getInitials(member.name)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{member.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{member.email}</span>
                    <span className="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 capitalize">
                      {member.role}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Members;

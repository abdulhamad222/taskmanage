import Spinner from '@/components/Spinner';

export default function DashboardLoading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner />
      <p className="mt-4 text-sm text-gray-600">Loading your dashboard…</p>
    </div>
  );
}

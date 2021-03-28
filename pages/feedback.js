import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton';

const MyFeedback = () => {
  const {user} = useAuth();
  const {data} = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    console.log('no data is there', data);

    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardShell>
    );
  }

  console.log('data', data);
  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback.length ? <FeedbackTable feedback={data.feedback} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default MyFeedback;

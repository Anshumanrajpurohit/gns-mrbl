import { Helmet } from "react-helmet-async";

import { WorkManager } from "@/components/admin/WorkManager";

const WorkPage = () => (
  <>
    <Helmet>
      <title>Work Admin | Ganpati Marble Goa</title>
    </Helmet>
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Admin route</p>
        <h2 className="font-display text-4xl text-foreground">Work management</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Create and maintain completed projects with multiple images, structured reviews, category tagging, and publish controls.
        </p>
      </div>
      <WorkManager />
    </section>
  </>
);

export default WorkPage;

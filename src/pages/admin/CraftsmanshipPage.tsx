import { Helmet } from "react-helmet-async";

import { CraftsmanshipManager } from "@/components/admin/CraftsmanshipManager";

const CraftsmanshipPage = () => (
  <>
    <Helmet>
      <title>Craftsmanship Admin | Ganpati Marble Goa</title>
    </Helmet>
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Admin route</p>
        <h2 className="font-display text-4xl text-foreground">Craftsmanship management</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Manage narrative sections, imagery, publish state, and dynamic feature points with the same visual tone as the public site.
        </p>
      </div>
      <CraftsmanshipManager />
    </section>
  </>
);

export default CraftsmanshipPage;

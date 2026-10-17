import PersonaPortal from "@/components/PersonaPortal";

export default function SIPage() {
  return (
    <PersonaPortal
      persona="System Integrator"
      description="Connect your delivery pipeline with GCC demand and help candidates move from sourcing to demonstrable readiness."
      features={[
        "Review available GCC requirements",
        "Source and shortlist sample talent",
        "Track candidate preparation and readiness",
        "Follow the deployment pipeline"
      ]}
    />
  );
}
import PersonaPortal from "@/components/PersonaPortal";

export default function GCCPage() {
  return (
    <PersonaPortal
      persona="GCC / Enterprise"
      description="Turn confirmed workforce demand into a clearer view of role requirements, skill gaps and candidate readiness."
      features={[
        "Create or review a role requirement",
        "Compare required skills with candidate evidence",
        "Review a readiness-led shortlist",
        "Track the status of a sample requirement"
      ]}
    />
  );
}
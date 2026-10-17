import PersonaPortal from "@/components/PersonaPortal";

export default function TalentPage() {
  return (
    <PersonaPortal
      persona="Talent"
      description="Understand what a role needs, see where you stand today and build the capabilities that can move you forward."
      features={[
        "Create a profile and map current skills",
        "See strengths and improvement areas",
        "Explore targeted learning and interview practice",
        "Follow readiness and opportunity progress"
      ]}
    />
  );
}
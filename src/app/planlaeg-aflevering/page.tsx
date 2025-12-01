import PlanlaegAfleveringClient from "./PlanlaegAfleveringClient";

type Props = {
  searchParams: {
    token?: string;
  };
};

export default function PlanlaegAflevering({ searchParams }: Props) {
  const token = searchParams.token ?? "";
  return <PlanlaegAfleveringClient token={token} />;
}


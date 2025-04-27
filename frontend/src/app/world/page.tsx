import { getServerSession } from "next-auth";
import WorldMapPage from "../../components/WorldMapPage";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

const WorldTopPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  return <WorldMapPage userId={session.user.id} />;
};

export default WorldTopPage;

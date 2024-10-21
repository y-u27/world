import WorldMapPage from "@/components/WorldMapPage";

type CountryProps = {
  id: number;
  countryName: string;
};

const worldTopPage = ({ id, countryName }: CountryProps) => {
  return (
    <>
      <WorldMapPage id={id} countryName={countryName} />
    </>
  );
};

export default worldTopPage;

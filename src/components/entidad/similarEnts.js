import Entidad from "./entidad";

export default function similarEnts({ similarEnts }) {
  return (
    <div className="">
      {similarEnts.map((sim, key) => {
        return <Entidad key={key} entidad={sim} type={"H"} />;
      })}
    </div>
  );
}

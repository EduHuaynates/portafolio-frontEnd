import Entidad from "./entidad";

export default function similarEnts({ similarEnts }) {
  console.log(similarEnts, "similar");
  return (
    <div className="">
      {similarEnts.map((sim, key) => {
        // console.log(sim,'sim')
        return <Entidad key={key} entidad={sim} type={"H"} />;
      })}
    </div>
  );
}

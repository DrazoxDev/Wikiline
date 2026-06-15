import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GameContent } from "../components/GameContent";

const Game = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameContent />
    </DndProvider>
  );
};

export default Game;
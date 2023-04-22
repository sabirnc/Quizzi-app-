import { useContext } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// components
import Start from "./components/start";
import Quiz from "./components/quiz";
import Restart from "./components/restart";
import Confetti from "./components/Confetti";

// layouts
import RootLayout from "./layouts/RootLayout";

// context
import { GlobalContext } from "./ context/globalConext";

function App() {

  // consuming the context
  const { count } = useContext(GlobalContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Start />} />
        <Route path="quizz" element={<Quiz />} />
        <Route
          path="submit-quizz"
          element={ <Restart /> }
        />
      </Route>
    )
  );

  return (
    <>
      {count === 5 && <Confetti />}

      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;

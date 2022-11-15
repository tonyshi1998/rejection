import { useDispatch, useSelector } from "react-redux";
import { AuthActions, selectIsLogged } from "../features/auth/auth-reducer";

export default function Home() {
  // is this page connected to redux?
  const isLogged = useSelector(selectIsLogged);

  return (
    <div className="bg-red-300 px-2">
      <h1 className="px-10 bg-green-500">Hello world</h1>
    </div>
  );
}

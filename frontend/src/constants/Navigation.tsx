import Weather from "../pages/Weather";
import Counter from "../pages/Counter";
import HomePage from "../pages/Home";
import Game from "../pages/Game";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";


/**
 * TODO: 
 * When developing locally (on your computer) this should be http://localhost:8080
 * 
 * When you deploy, modify this constant to point to the URL of your backend.
 * It should be of the format "https://<app-name>.fly.dev/api" 
 * 
 * https://fly.io/apps/howmuchdoyoustroke'
 *
 * Most of the time, the name of your app is the name of the folder you're in
 * right now, and the name of your Git repository.
 * For instance, if that name is "my-app", then you should set this to: 
 * "https://my-app.fly.dev/api"
 *
 * https://thestrokesgame2.fly.dev/api
 * 
 * https://fly.io/apps/howmuchdoyoustroke
 * https://fly.io/apps/thestrokesgame2
 * https://thestrokesgame2.fly.dev/
 * 
 * If you've already deployed your app (using `fly launch` or `fly deploy`),
 * you can find the name by running `flyctl status`, under App > Name.
 */
export const BACKEND_BASE_PATH = 'https://thestrokesgame2.fly.dev/api';

export const PATHS: {
    link: string;
    label: string;
    element?: JSX.Element;
}[] = [
    {
        link: "/",
        label: "Home",
        element: <HomePage />,
    },
    {
        link: "/weather",
        label: "Weather",
        element: <Weather />,
    },
    {
        link: "/counter",
        label: "Counter",
        element: <Counter />,
    },
    {
        link: "/game",
        label: "Game",
        element: <Game />,
    },
    // {
    //     link: "/score",
    //     label: "Score",
    //     element: <ScoreboardPage />,
    // },
    {
        link: "/createaccount",
        label: "Sign-up",
        element: <CreateAccount />,
    },
    {
        link: "/login",
        label: "Sign-in",
        element: <Login />,
    },
];

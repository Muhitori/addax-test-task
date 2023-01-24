import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Calendar } from "./Сalendar";

function App() {
	return (
		<Provider store={store}>
			<CssBaseline />
			<Calendar />
		</Provider>
	);
}

export default App;

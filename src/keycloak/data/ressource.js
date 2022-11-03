import {createSource} from "react-async-states";
import {producer} from "./producer";

export const currentUserSource = createSource('current-user', producer);

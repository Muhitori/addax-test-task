import axios from "axios";
import { HolidayDto, HolidayResponse } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND;

export class HolidayService {
	static async getHolidays(year: number): Promise<HolidayDto[]> {
		const { data } = await axios.get(`${BASE_URL}/${year}/UA`);

		return data.map(({ date, name }: HolidayResponse) => ({ date, name }));
	}
}

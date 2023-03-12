import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useFilterMethods from "../services/utilities/useFilterMethods";

describe("testing Filter Method hook", () => {
  test("render searchFilters", () => {
    const { result } = renderHook(useFilterMethods);
    const users = [
      { id: 1, username: "Ali" },
      { id: 2, username: "Harmony" },
    ];
    const value = "Ali";
    let searchResult = [];
    act(() => (searchResult = result.current[0](value, users)));
    expect(searchResult).toHaveLength(1);
  });
  ///
  test("render hobbiesFilters", () => {
    const { result } = renderHook(useFilterMethods);
    const users = [
      { id: 1, hobby: "Swimming" },
      { id: 2, hobby: "Reading" },
    ];
    const value = ["Reading"];
    let searchResult = [];
    act(() => (searchResult = result.current[1](value, users)));
    expect(searchResult).toHaveLength(1);
  });
  ///
  test("render DateFilter", () => {
    const { result } = renderHook(useFilterMethods);
    const users = [
      { id: 1, date: new Date("2020-03-05") },
      { id: 2, date: new Date("2020-03-05") },
    ];
    const value = new Date("2020-01-25");
    let searchResult = [];
    act(() => (searchResult = result.current[2](value, users)));
    expect(searchResult).toHaveLength(2);
  });
  ///
  test("render emailFilters", () => {
    const { result } = renderHook(useFilterMethods);
    const users = [
      { id: 1, email: "ali@gmail.com" },
      { id: 2, email: "awe@gmail.com" },
    ];
    const value = "ali";
    let searchResult = [];
    act(() => (searchResult = result.current[3](value, users)));
    expect(searchResult).toHaveLength(1);
  });
  ///
});

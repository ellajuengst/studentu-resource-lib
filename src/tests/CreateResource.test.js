import {React} from "react";
import { act, render, screen, cleanup, fireEvent } from "@testing-library/react"
import {HashRouter} from "react-router-dom";
import ResourceLibrary from "../pages/ResourceLibrary"
import {AuthContext} from "../AuthContext";
import CreateResource from "../pages/CreateResource";

const value = {
    currentUser: null,
    signin: jest.fn(),
    signout: jest.fn(),
};

afterEach(cleanup);

test("Renders CreateResource page", () => {
    render(<AuthContext.Provider value={value}><HashRouter><CreateResource/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("create-resource");
    expect(element).toBeInTheDocument();
});

test("Renders submit button correctly", () => {
    render(<AuthContext.Provider value={value}><HashRouter><CreateResource/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("submit-button");
    expect(element).toBeInTheDocument();
});

test("Displays error when admin doesn't input required fields", () => {
    render(<AuthContext.Provider value={value}><HashRouter><CreateResource/></HashRouter></AuthContext.Provider>);
    const submit = screen.getByTestId("submit-button");
    fireEvent.click(submit);
    const error = screen.getByTestId("category-error");
    expect(error).toBeInTheDocument();
});
 
import {React} from "react";
import { act, render, screen, cleanup, fireEvent } from "@testing-library/react"
import {HashRouter} from "react-router-dom";
import SignIn from "../pages/SignIn"
import {AuthContext} from "../AuthContext";

const value = {
    currentUser: null,
    signin: jest.fn(),
    signout: jest.fn(),
};

afterEach(cleanup);

test("Renders SignIn page", () => {
    render(<AuthContext.Provider value={value}><HashRouter><SignIn/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("sign-in");
    expect(element).toBeInTheDocument();
})

test('SignIn form elements are rendered correctly', () => {
    render(<AuthContext.Provider value={value}><HashRouter><SignIn/></HashRouter></AuthContext.Provider>);
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();

});

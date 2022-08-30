import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth";
import { AppRouter } from "../../../router/AppRouter";


describe('Tests in <AppRouter />', () => {

    test('should show login if user is not authenticated', () => {


        const contextValue = {
            logged: false,
        }

        render( 
        <MemoryRouter initialEntries={["/marvel"]}>
            <AuthContext.Provider value ={ contextValue }>
                <AppRouter /> 
            </AuthContext.Provider> 
        </MemoryRouter>
        );

        expect( screen.getAllByText("Login").length ).toBe(2);

    });


    test('should show marvel component if user is authenticated', () => {


        
        const contextValue = {
            logged: true,
            user: {
                id: "abc",
                name: "Tomas",
            }
        }

        render( 
        <MemoryRouter initialEntries={["/login"]}>
            <AuthContext.Provider value ={ contextValue }>
                <AppRouter /> 
            </AuthContext.Provider> 
        </MemoryRouter>
        );

        expect( screen.getAllByText("Marvel").length ).toBeGreaterThanOrEqual(1);
        
    });



});
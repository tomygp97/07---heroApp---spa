import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth";
import { PrivateRoute } from "../../../router/PrivateRoute";


describe( "Test in <PrivateRoute />", () =>  {


    test('should show children if user is authenticated', () => {


        Storage.prototype.setItem = jest.fn();


        const contextValue = {
            logged: true,
            user: {
                id: "ABC",
                name: "Tomas"
            }
        }

        render( 
            <AuthContext.Provider value ={ contextValue }>
                <MemoryRouter initialEntries={["search?q=batman"]}>
                    <PrivateRoute>
                        <h1>Private Route</h1>
                    </PrivateRoute> 
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText("Private Route") ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith( "lastPath", "search?q=batman" );

    });

})
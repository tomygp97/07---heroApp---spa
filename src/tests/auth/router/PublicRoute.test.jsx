import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../../auth";
import { PublicRoute } from "../../../router/PublicRoute";
import { MemoryRouter, Routes, Route } from "react-router-dom";



describe('Tests in <PublicRoute /> ', () => {

    test('should show children if user is not authenticated', () => {

        const contextValue = {
            logged: false,
        }

        render( 
            <AuthContext.Provider value ={ contextValue }>
                <PublicRoute>
                    <h1>Public Route</h1>
                </PublicRoute> 
            </AuthContext.Provider>
        );

        expect( screen.getByText("Public Route") ).toBeTruthy();

    });

    test('should navigate if user is authemticated', () => {

        const contextValue = {
            logged: true,
            user: {
                name: "Camilo",
                id: "ABC123",
            }
        }

        render( 
            <AuthContext.Provider value ={ contextValue }>
                <MemoryRouter initialEntries={["/login"]}>

                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Public Route</h1>
                            </PublicRoute> 
                        }/>
                        <Route path="marvel" element={ <h1>Marvel Page</h1> }/>
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        screen.debug();


    })

})




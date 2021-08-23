import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { loginSuccess } from "../../features/login/loginSlice";
import { getUserProfile } from '../../features/users/userAction';
import { fetchNewAccessJWT } from "../../api/usersApi";
import Layout from "../Layout/index";

export const PrivateRoute = ({ children, ...rest }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	let location = useLocation();
	
	const { isAuth } = useSelector(state => state.login);
	const { user } = useSelector(state => state.users);
	let { from } = location.state || { from: { pathname: "/" } };

	useEffect(() => {
		const updateAccessJWT = async () => {
			const result = await fetchNewAccessJWT();
			result && dispatch(loginSuccess());
		};

		!user._id && dispatch(getUserProfile());

		!sessionStorage.getItem("accessJWT") &&
			localStorage.getItem("TalentHouse") &&
			updateAccessJWT();

		if (sessionStorage.getItem("accessJWT") && !isAuth) {
			history.replace(from);
			dispatch(loginSuccess());
			dispatch(getUserProfile());
		}
	}, [dispatch, isAuth, user._id, history, from]);

	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuth ? (
					<Layout>{children}</Layout>
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

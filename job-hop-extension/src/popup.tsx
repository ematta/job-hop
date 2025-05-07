import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./AuthProvider";
import LoginForm from "./LoginForm";
import JobForm from "./JobForm";

const PopupContent: React.FC = () => {
	const { session, loading } = useAuth();
	const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchCurrentUrl = async () => {
			async function fetchCurrentUrl() {
				const [tab] = await chrome.tabs.query({
					active: true,
					lastFocusedWindow: true,
				});
				setCurrentUrl(tab.url);
			}
			fetchCurrentUrl()
				.then(() => {
					console.log("Current URL:", currentUrl);
				})
				.catch((error) => {
					console.error("Error fetching current URL:", error);
				});
		};

		fetchCurrentUrl();
	}, []);

	if (loading) return <div>Loading...</div>;
	return session ? <JobForm prefillUrl={currentUrl} /> : <LoginForm />;
};

const Popup: React.FC = () => (
	<AuthProvider>
		<PopupContent />
	</AuthProvider>
);

export default Popup;

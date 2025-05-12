import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./AuthProvider";
import LoginForm from "./LoginForm";
import JobForm from "./JobForm";

const PopupContent: React.FC = () => {
	const { session, loading } = useAuth();
	const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchCurrentUrl = async () => {
			try {
				const [tab] = await chrome.tabs.query({
					active: true,
					lastFocusedWindow: true,
				});
				if (tab && tab.url) {
					setCurrentUrl(tab.url);
				} else {
					console.warn("Could not get current tab URL.");
					setCurrentUrl(''); // Or some other default/error state
				}
			} catch (error) {
				console.error("Error fetching current URL:", error);
				setCurrentUrl(''); // Or some other default/error state
			}
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

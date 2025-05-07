import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthProvider";
import {
	Box,
	Typography,
	TextField,
	Button,
	Alert,
	CircularProgress,
} from "@mui/material";

const LoginForm: React.FC = () => {
	const { refreshSession } = useAuth();
	const [email, setEmail] = useState("");
	const [userId, setUserId] = useState<string | null>(null);
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// On mount, check if user is already logged in
	useEffect(() => {
		// Read user from cookie instead of localStorage
		const match = document.cookie.match(/(?:^|; )supabase_user=([^;]*)/);
		if (match) {
			try {
				const user = JSON.parse(decodeURIComponent(match[1]));
				if (user?.id || user?.uuid) {
					setUserId(user.id || user.uuid);
				}
			} catch {
				// ignore
			}
		}
	}, []);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const { error, data } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		setLoading(false);
		const { user } = data || {};
		setUserId(user?.id || null);
		if (error) setError(error.message);
		else {
			// Save user to cookie for session persistence
			if (user) {
				document.cookie = `supabase_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=604800; samesite=strict`;
			}
			refreshSession();
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleLogin}
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 1.2,
				width: 340,
				bgcolor: "#f8fafc",
				color: "#1e293b",
				p: 2,
				borderRadius: 3,
				boxShadow: 4,
				mx: "auto",
				mt: 6,
				minHeight: 340,
			}}
		>
			<Typography
				variant="h6"
				mb={0.5}
				color="#1e293b"
				fontWeight={700}
				letterSpacing={1}
				textAlign="center"
			>
				Job-Hop
			</Typography>
			<Typography
				variant="h6"
				mb={0.5}
				color="#1e293b"
				fontWeight={700}
				letterSpacing={1}
				textAlign="center"
			>
				Login
			</Typography>
			{error && (
				<Alert severity="error" sx={{ mb: 1.2, borderRadius: 2 }}>
					{error}
				</Alert>
			)}
			<TextField
				label="Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				fullWidth
				margin="dense"
				autoComplete="email"
				InputLabelProps={{ style: { color: "#64748b" } }}
				InputProps={{
					style: { color: "#1e293b", background: "#f1f5f9", borderRadius: 2 },
				}}
				sx={{
					"& .MuiOutlinedInput-root": { bgcolor: "#f1f5f9", borderRadius: 2 },
					"& .MuiOutlinedInput-notchedOutline": { borderColor: "#cbd5e1" },
				}}
			/>
			<TextField
				label="Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				fullWidth
				margin="dense"
				autoComplete="current-password"
				InputLabelProps={{ style: { color: "#64748b" } }}
				InputProps={{
					style: { color: "#1e293b", background: "#f1f5f9", borderRadius: 2 },
				}}
				sx={{
					"& .MuiOutlinedInput-root": { bgcolor: "#f1f5f9", borderRadius: 2 },
					"& .MuiOutlinedInput-notchedOutline": { borderColor: "#cbd5e1" },
				}}
			/>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				disabled={loading}
				sx={{
					mt: 1.2,
					fontWeight: "bold",
					borderRadius: 2,
					boxShadow: 2,
					textTransform: "none",
					fontSize: 16,
					py: 0.8,
				}}
			>
				{loading ? (
					<CircularProgress size={22} sx={{ color: "#fff" }} />
				) : (
					"Login"
				)}
			</Button>
		</Box>
	);
};

export default LoginForm;

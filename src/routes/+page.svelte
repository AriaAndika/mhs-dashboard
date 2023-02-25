
<svelte:head>
	<link rel="stylesheet" href="/login.css">
</svelte:head>

<div class="top-container">
	<div class="box">
		<form>
			
			<h2>LOGIN ABSENSI UDINUS</h2>
			<div class="inputBox">
				<input type="text" id="nim" name="nim" required />
				<span>NIM</span>
				<i></i>
			</div>
			
			<div class="inputBox">
				<input type="password" id="password" name="password" required />
				<span>Password</span>
				<i></i>
			</div>
			
			<div class="links">
				<a href="#nim">Lupa Password?</a>
			</div>
			
			<input type="submit" value="LOGIN" />
			
		</form>
	</div>
</div>

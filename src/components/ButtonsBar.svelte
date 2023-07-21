<div>
	<slot />
</div>

<style>
	div {
		display: flex;
		gap: clamp(0.5rem, 8vw, 1.0rem);
        margin-block: .25rem;
		justify-content: center;
	}
</style>

$(document).ready(() => {
	$('#modal-button').click(() => {
		$('.modal-body').html('');
		$.get('/api/logs', (results = {}) => {
			const {data} = results;
			if(!data || !data.logs) return;
			data.logs.forEach(log => {
				$('.modal-body').append(
					`<div>
						<span class="course-title">
							${log.factorOfWellbeing}
						</span>
						<span class="course-title">
							${log.referenceDate}
						</span>
						<div class="course-description">
							${log.annotation}
						</div>
					</div>`
				);
			});
		});
	});
});
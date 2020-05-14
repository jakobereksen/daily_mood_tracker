const {Course, request} = require("../../commonJest");

const testCourseData = {
	code: "B16",
	name: "2. Fremdsprache",
	mission: "learn language",
	ects: 4,
	examination: "Exam",
	objectives: "learn language",
	contents: "verbs, nouns and adjectives",
	prerequisites: "basic course in same language",
	literature: "text book",
	methods: "WP Ü",
	skills_knowledge_understanding: "skills 1",
	skills_intellectual: "skills 2",
	skills_practical: "skills 3",
	skills_general: "skills 4"
};
describe("coursesController", function () {
	describe("SAVE course", function () {
		it("should save the posted course", function (done) {
			const testCourse = new Course(testCourseData);
			testCourse.save()
				.then(() => {
					Course.find({})
						.then(result => {
							expect(result.length).toBe(1);
							expect(result[0]).toHaveProperty("_id");
							done();
						});
				})
				.catch((error) => {
					done(error.message);
				});
		});
	});
});

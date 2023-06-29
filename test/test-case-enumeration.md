# Data logger Unit Test cases

## Purpose
This document details the unit test cases for Data logger service

## Test Framework
Unit test cases are written using [Jest](https//jestjs.io)

## Test cases

### Test cases table definitions
- **Component** -> Specifies the code component 
- **Feature Under Test** -> Target method name
- **Test Target** -> Specific requirement to test. ex. Functional, security etc.
- **Scenario** -> Requirement to test
- **Expectation** -> Expected result from executed scenario

### Jest code pattern

```javascript
describe("{{Component}}", () => {
	describe("{{Feature Under Test}}", () => {
		describe("{{Test Target}}", () => {  
			const getTestData => return {};
			it('{{Scenario}}, {{Expectation}}', () => {
				//Arrange
				let testData = getTestData();
				let controller = new controller();
				//Act
				const result = controller.getVersions();
				//Assert
				expect(result.status).toBe(200);
				expect(result.myAwesomeField).toBe('valid');
			});
 		});
 	});
 });
```

### Test cases

| Component | Feature Under Test | Test Target | Scenario | Expectation | Status |
|--|--|--|--|--|--|
| Status Controller | Get Status | Functional| When requested with a valid record | Expect to get the record status |:white_check_mark:|
| Status Controller | Get Status | Functional| When requested with a empty recordID | Expect to get the 400 HTTP status |:white_check_mark:|
| Status Controller | Get Stage | Functional| When requested with a valid record | Expect to get the record details |:white_check_mark:|
| Status Controller | Get Stage | Functional| When requested with a empty recordID | Expect to get the 400 HTTP status |:white_check_mark:|
| Health Controller | Ping | Functional | When health ping is requested | Expect to receive 200 HTTP status | :white_check_mark:|
| Listener Service | On Receive | Functional | When a message is received by the listener | Expect it to be processed by database service | :white_check_mark:|
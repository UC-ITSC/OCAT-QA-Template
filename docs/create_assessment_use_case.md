# USE CASE

- Name of Test Case: Create Assessment

- Description: This use case is for a user creating an assessment on OCAT

- Actors: User

- Preconditions:
  1.  The user must be logged in

- Flow:
    1. Go to the New Assessment Page
    2. Score should start at 0 and risk level should be Low
    3. Fill out the Cat Name and Cat Date of Birth
    4. Click through the scoring questions
    5. Score and Risk Level should match the correct score
    6. Click Submit
    7. The Form should be reset to blank values immediately after submitting
- Alternate Flows: No alternate flows

- Exceptions:
  - 1. Submitting the create assessment form without filling out Cat Name and Cate Date of Birth fields should result in the form not submitting
  - 2. The score and risk level don't automatically update as the user fills out the questions
  - 3. Assessment doesn't appear in the list at post-condition _

- Post-conditions
  - 1. Assessment should appear in the list with the correct Cat Name, Date of Birth, Risk Level, Score, and Creation Date
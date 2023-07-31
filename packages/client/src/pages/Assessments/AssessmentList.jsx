import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    setLoading(true);
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
    setLoading(false);
  }, []);

  const deleteAssessment = async (assessment) => {
    await AssessmentService.delete(assessment); // TODO how to get the id...
  };

  return (
    <div>
      { loading ?
        <div>Loading...</div> :
        <>
          <h1>Assessments</h1>
          <table>
            <thead>
              <tr>
                <th>Cat Name</th>
                <th>Cate Date of Birth</th>
                <th>Score</th>
                <th>Risk Level</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {assessments.map(assessment =>
                <tr key={assessment.id}>
                  <td>{assessment.catName}</td>
                  <td>{assessment.catDateOfBirth}</td>
                  <td>{assessment.score}</td>
                  <td>{assessment.riskLevel}</td>
                  <td>{dayjs(assessment.createdAt).format(`MMM D, YYYY`)}</td>
                  <td>
                    <Button
                      onClick={(e) => { e.stopPropagation(); deleteAssessment(assessment); }}
                    >Delete Assessment</Button></td>
                </tr>)}
            </tbody>
          </table>
        </>}
    </div>
  );
};

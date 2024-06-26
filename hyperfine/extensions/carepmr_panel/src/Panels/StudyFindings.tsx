import React from 'react';
import { InputRange, Select, Typography, InputFilterText } from '@ohif/ui';

const StudyFindings = ({ demographics = false }) => {
  const findings = { server_stuff: 'blah blah blah' };

  return (
    <>
      <Typography variant="h6" className="text-blue-800">
        {'Identifier'}
      </Typography>
      <Typography variant="body" color="secondary">
        {'ACTION_007'}
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {'Time of LF Scan'}
      </Typography>
      <Typography variant="body" color="secondary">
        {'1/1/2024 15:00'}
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {'Time from LWK to LF'}
      </Typography>
      <Typography variant="body" color="secondary">
        {'Unknown'}
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {'Time of HF Scan'}
      </Typography>
      <Typography variant="body" color="secondary">
        {'1/1/2024 14:00'}
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {'tPA Status'}
      </Typography>
      <Typography variant="body" color="secondary">
        {'0'}
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {'EVT Status'}
      </Typography>
      <Typography variant="body" color="secondary">
        {'0'}
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {' '}
        Diagnosis
      </Typography>
      <Typography variant="body" color="secondary">
        {' '}
        Wake up stroke
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {' '}
        Confirmed event
      </Typography>
      <Typography variant="body" color="secondary">
        {' Confirmed ischemic stroke event'}
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {' '}
        Time of LKW
      </Typography>
      <Typography variant="body" color="secondary">
        {'1/1/2024 09:00'}
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {' '}
        Acute stroke CT findings
      </Typography>
      <Typography variant="body" color="secondary">
        {
          'Diffuse premature cerebral atrophy with microvascular change but with otherwise no acute cerebral mass effect, edema or hemorrhage.'
        }
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {' '}
        Acute CT perfusion findings
      </Typography>
      <Typography variant="body" color="secondary">
        {'There is no vascular distribution perfusion defect identified'}
      </Typography>

      <Typography variant="h6" className="text-blue-800">
        {' '}
        High field MRI findings
      </Typography>
      <Typography variant="body" color="secondary">
        {
          'Restricted diffusion present on the left in the anteromedial temporal lobe, basal ganglia, and posterior left corona radiata. Findings compatible sequelae of acute or subacute infarction.'
        }
      </Typography>
    </>
  );
};

export default StudyFindings;

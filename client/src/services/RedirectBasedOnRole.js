//will get back to this later

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from './RoleContext';

export const RedirectStudent = ({ role }) => {
  const navigate = useNavigate();
  const { setRole } = useRole();

  useEffect(() => {
    if (role === 'teacher') {
      navigate('/student/StudentLogin');
    }
  }, [navigate, role, setRole]);

  return null;
};

export const RedirectTeacher = ({ role }) => {
    const navigate = useNavigate();
    const { setRole } = useRole();
  
    useEffect(() => {
      if (role === 'student') {
        navigate('/teacher/TeacherLogin');
      }
    }, [navigate, role, setRole]);
  
    return null;
  };


import React, { useEffect } from 'react';
type IAppProps = { total: number; completed: number; percentage: number };
import Image from 'next/image';

const Navbar: React.FunctionComponent<IAppProps> = ({ total, completed, percentage }: IAppProps) => {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  return (
    <div>
      <div className='navbar'>
        <div className='logo'>
          <Image src="../assets/logo.svg" width={55} height={53} alt="hero-logo" />
        </div>
        <div className='progress-bar'>
          <div className='progress-container'>
            <div className='progress-content'>
              <div className='progress-label'>
                <p>Total Task : {total}</p>
                <p>Task Completed : {completed}</p>
              </div>
              <div className='progress'>
                <div className='progress-total'>
                  <div className='progress-completed' style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
            <div className='progress-percentage'>
              <h2>{progress}%</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navbar };


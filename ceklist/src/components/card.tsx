import React from "react";
import Image from "next/image";
type IAppProps = {
  task: string;
  numtask: number;
  handleDelete: () => void;
  handleComplete: () => void;
};

const Card: React.FunctionComponent<IAppProps> = ({
  task,
  numtask,
  handleDelete,
  handleComplete
}: IAppProps) => {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <div className="card-title">
            <h4>Task {numtask}</h4>
            <p>{task}</p>
          </div>
          <div className="action">
            <button>
              <i>
                <Image
                  src="../assets/Remove-Icon.svg"
                  alt="del"
                  width={15}
                  height={15}
                  onClick={handleDelete}
                />
              </i>
            </button>
            <button>
              <i>
                <Image
                  src="../assets/Done-Icon.svg"
                  alt="check"
                  width={15}
                  height={15}
                  onClick={handleComplete}
                />
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card };

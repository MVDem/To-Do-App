import styles from './animationComplete.module.scss';
import { FcApproval, FcCancel } from 'react-icons/fc';

function AnimationComplete({
  children,
  start,
  label,
}: {
  children: JSX.Element;
  start: boolean;
  label: string;
}) {
  return (
    <div className={start ? styles.animation : ''}>
      {start && (
        <div className={start ? styles.animationLabel : ''}>
          {label === 'Completed' ? (
            <FcApproval />
          ) : label === 'Deleted' ? (
            <FcCancel />
          ) : (
            <></>
          )}
        </div>
      )}
      <div className={start ? styles.animationContent : ''}>{children}</div>
    </div>
  );
}
export default AnimationComplete;

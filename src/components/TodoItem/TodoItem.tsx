import { Todo } from '../../models/models';
import styles from './todoItem.module.scss';
import AnimationComplete from '../AnimationComplete/AnimtionComplete';
import { useEffect, useState } from 'react';

function TodoItem({
  todo,
  onToggle,
  onRemove,
  isActive,
}: {
  todo: Todo;
  onToggle?: (id: number) => void | undefined;
  onRemove?: (id: number) => void | undefined;
  isActive: boolean;
}) {
  const [animationToggleStart, setAnimationToggleStart] = useState(false);
  const [label, setLabel] = useState('');
  const [_isActive, _setIsActive] = useState(isActive);
  const itemOpacity = todo.completed ? 0.8 : 1;

  useEffect(() => {
    _setIsActive(isActive);
  }, [isActive]);

  const getDate = (deadline: number) => {
    const date = new Date(deadline);
    return date.toLocaleDateString();
  };

  const styleDedline = (deadline: number) => {
    const date = new Date(deadline);
    const currentDate = new Date();
    return date < currentDate ? 'red' : '$text';
  };

  const handleAnimation = (labelName: string) => {
    _setIsActive(false);
    setLabel(labelName);
    setAnimationToggleStart(true);
    setTimeout(() => {
      setAnimationToggleStart(false);
      if (labelName === 'Completed') {
        onToggle!(todo.id);
      } else if (labelName === 'Deleted') {
        onRemove!(todo.id);
      }
    }, 2000);
  };

  return (
    <AnimationComplete start={animationToggleStart} label={label}>
      <div className={styles.todoItem} style={{ opacity: itemOpacity }}>
        <div className={styles.topContainer}>
          <h5>{todo.title}</h5>
          <p style={{ color: styleDedline(todo.deadline) }}>
            {getDate(todo.deadline)}
          </p>
        </div>
        {_isActive && (
          <div className={styles.todoContent}>
            <p>{todo.description}</p>
          </div>
        )}
        {_isActive && (
          <div className={styles.controls}>
            {onRemove && (
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => handleAnimation('Deleted')}
              >
                Delete
              </button>
            )}
            {onToggle && (
              <button
                type="button"
                className={styles.completeBtn}
                onClick={() => handleAnimation('Completed')}
              >
                Complete
              </button>
            )}
          </div>
        )}
      </div>
    </AnimationComplete>
  );
}

export default TodoItem;

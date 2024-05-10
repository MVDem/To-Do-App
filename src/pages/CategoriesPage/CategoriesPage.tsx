import { useContext, useState } from 'react';
import styles from './categoriesPage.module.scss';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoAddCircle } from 'react-icons/io5';
import { GrFormNextLink } from 'react-icons/gr';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
// import { CategoriesList } from '../../models/models';
import { UserContext } from '../../App';

function CategoriesPage() {
  //   const [categories, setCategories] = useState<CategoriesList[]>([
  //     { title: 'Work', id: 1, emoji: '💼' },
  //     { title: 'Home', id: 2, emoji: '🏠' },
  //     { title: 'Sport', id: 3, emoji: '🏋️' },
  //   ]);
  const categories = useContext(UserContext)?.categories;

  const [action, setAction] = useState('button');
  const [title, setTitle] = useState('');

  const handleDelete = (id: number) => {
    // const newCategories = categories?.categoriesList?.filter(
    //   (e) => e.id !== id || []
    // );
    categories?.onDelete!(id);
  };

  const handleAdd = (emoji: string) => {
    // const newCategories = [
    //   ...categories?.categoriesList!,
    //   { title, emoji, id: categories?.categoriesList?.length! + 1 },
    // ];
    categories?.onAdd!({
      title,
      emoji,
      id: categories?.categoriesList?.length! + 1,
    });
    setAction('button');
  };
  return (
    <div>
      <section className={styles.categories}>
        <h1>Categories :</h1>
        <ul className={styles.categoriesList}>
          {categories?.categoriesList?.map((category, index) => (
            <li className={styles.categoriesItem} key={index}>
              <div className={styles.categoryImg}>
                {category.emoji ? category.emoji : '📁'}
              </div>
              <p>{category.title}</p>
              <button
                className={styles.addBtn}
                onClick={() => handleDelete(category.id)}
              >
                <IoMdCloseCircle />
              </button>
            </li>
          ))}
          <li className={styles.addCategory}>
            {action === 'button' && (
              <button
                className={styles.addBtn}
                onClick={() => setAction('title')}
              >
                <IoAddCircle />
              </button>
            )}
            {action === 'title' && (
              <>
                <input
                  type="text"
                  placeholder="Category name"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <button
                  className={styles.nextBtn}
                  onClick={() => setAction('emoji')}
                >
                  <GrFormNextLink />
                </button>
              </>
            )}
            {action === 'emoji' && (
              <>
                <Picker
                  data={data}
                  onEmojiSelect={(e: { native: string }) => handleAdd(e.native)}
                />
              </>
            )}
          </li>
        </ul>
      </section>
    </div>
  );
}
export default CategoriesPage;

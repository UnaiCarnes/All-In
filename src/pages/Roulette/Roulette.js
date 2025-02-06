import { useTranslation } from 'react-i18next';


const Roulette = () => {
  const { t } = useTranslation();

  return (
    <div
      className="h-full w-full bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: "url('/img/ruleta.png')" }}
    >
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-md flex items-center justify-center">
        <h1 className="text-6xl font-bold text-yellow-400 text-center">
          {t('ORGANS.Próximamente')}
        </h1>
      </div>
    </div>
  );
};

export default Roulette;

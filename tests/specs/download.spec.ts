import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

test.describe('File Download and Validation Module', () => {
  test(
    'Download text file and verify its content via POM',
    { tag: ['@ui', '@regression', '@functional'] },
    async ({ downloadPage, webActions }) => {
      // 1. Definiujemy nazwę pliku, który chcemy pobrać z herokuapp
      const fileName = 'Test.txt';
      const downloadDirectory = './Downloads';

      // 2. Otwieramy stronę pobierania (metoda odziedziczona z BasePage korzystająca z protected path)
      await downloadPage.open();

      // 3. Pobieramy plik za pomocą naszej metody z POM i odbieramy pełną ścieżkę na dysku
      const filePath = await downloadPage.downloadFileByName(fileName, downloadDirectory);

      // 4. Odczytujemy surową zawartość pliku z dysku przy użyciu WebActions (Twoja natywna metoda!)
      const fileContent = await webActions.readValuesFromTextFile(filePath);

      // 5. Biznesowa asercja końcowa – sprawdzamy czy plik nie jest pusty i zawiera to, co trzeba
      expect(fileContent).toBeTruthy();
      expect(fileContent).toContain('Action'); // Przykładowe słowo, które często generuje się w plikach na herokuapp
    },
  );
});

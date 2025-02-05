# RPG Hra

## Úvod
Tento projekt je jednoduchá RPG hra, kde hráči mohou vytvářet a spravovat své postavy, bojovat s nepřáteli a získávat body. Hra je postavena na technologii PHP, databázi, JavaScriptu, HTML a CSS.

## Struktura projektu
Projekt se skládá z následujících komponent:

- **HTML**: Struktura webové stránky.
- **CSS**: Styly pro webovou stránku.
- **JavaScript**: Logika hry na straně klienta.
- **PHP**: Zpracování dat a interakce s databází.
- **Databáze**: Ukládání herních dat.

## Funkce aplikace
### Vytvoření postavy
Hráči mohou vytvořit svou postavu zadáním jména. Postava je uložena v databázi s přednastaveným počtem životů.

### Boj s nepřáteli
Hráči mohou bojovat s náhodně vybranými nepřáteli. Boj probíhá tak, že hráč klikne na tlačítko **"Útoč"**, a oba účastníci (hráč i nepřítel) utrpí náhodné poškození. Boj končí, když jeden z účastníků ztratí všechny životy.

### Skóre
Po skončení boje se aktualizuje skóre hráče v databázi. Hráči mohou vidět tabulku nejlepších skóre.

## Technologie
### HTML
Používá se k vytvoření struktury webové stránky. Obsahuje formulář pro vytvoření postavy, oblast pro boj a tabulku skóre.

### CSS
Používá se k vytvoření stylů pro webovou stránku. Zajišťuje, aby stránka byla přehledná a uživatelsky přívětivá.

### JavaScript
Používá se k implementaci logiky hry na straně klienta. Zajišťuje interakci s uživatelem, jako je vytvoření postavy, boj s nepřáteli a aktualizace skóre.

### PHP
Slouží k zpracování dat a interakci s databází. Zajišťuje vytvoření postavy, načtení nepřátel, aktualizaci životů a skóre po boji.

### Databáze
Slouží k ukládání informací o postavách a nepřátelích. Obsahuje tabulky pro postavy a nepřátele, kde jsou uloženy jejich jména, životy a skóre.

## Instalace a spuštění
1. Naklonujte tento repozitář:
   ```sh
   git clone https://github.com/Dakk17/SWAgameska.git
   ```
2. Nahrajte soubory na server s podporou PHP a MySQL.
3. Vytvořte databázi a importujte soubor `database.sql`.
4. Upravte soubor `logins.php` s přihlašovacími údaji k databázi.
5. Spusťte projekt v prohlížeči.

> [!WARNING]
> Důležité upozornění!
> Ujistěte se, že soubor `logins.php` obsahuje správné přihlašovací údaje k databázi.
> Nepoužívejte slabá hesla pro připojení k databázi.

> [!IMPORTANT]
> Bezpečnostní tipy
> V produkčním prostředí skryjte chybové výpisy PHP pomocí `error_reporting(0);`.
> Používejte připravené dotazy v SQL, aby se zabránilo SQL injection.

> [!TIP]
> Užitečné rady
> Pokud se hra nechová podle očekávání, zkontrolujte konzoli prohlížeče (F12 > Console).
> Pro ladění PHP můžete použít `error_log` nebo `var_dump()`.

## Závěr
Tento projekt poskytuje jednoduchou RPG hru, kde hráči mohou vytvářet a spravovat své postavy, bojovat s nepřáteli a získávat body. Projekt využívá PHP, databázi, JavaScript, HTML a CSS k dosažení této funkčnosti.


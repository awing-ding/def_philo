import definition from '../app/data.json';
import '../app/globals.css';
import style from 'app/style.module.css';
import { ReactNode } from 'react';
import Link from 'next/link';
import navbar from './navbar.tsx';


interface Citation {
    auteur : string,
    citation : string,
    notion : Array<string>,
    ouvrage : string,
    latin? : string
}

function isDataPropertyConforming(element : HTMLElement) : boolean {
    const author = element.getAttribute('data-auteur');
    const notion = element.getAttribute('data-notion');

    const authorSelector = document.getElementById('author-select') as HTMLSelectElement;
    const notionSelector = document.getElementById('notion-select') as HTMLSelectElement;

    return isConforming(authorSelector, author) && isConforming(notionSelector, notion);
}

function isConforming(Selector : HTMLSelectElement, value : string) : boolean {
    let isConforming = false;
    value.split(',').forEach((element) => {
        if (Selector.value === element) {
            isConforming = true;
        }
    });
    return Selector.value === 'all' || Selector.value === 'none' || isConforming;
}

async function handleSelection() {
    let elements = document.querySelectorAll('main > div');
    const notion_selector = document.getElementById('notion-select') as HTMLSelectElement;
    const notion_selector_value = notion_selector.value;
    elements.forEach(el => {
        let element = el as HTMLElement;
        let doesConform = isDataPropertyConforming(element);
        element.style.display = doesConform ? 'inherit' : 'none';
    });
}

function getOnlyNotion(){
    let notions = [];
    for (let i = 0; i < definition.notions.length; i++) {
        notions.push(definition.notions[i].word);
    }
    return (
        <select name="notion" id="notion-select" onChange={handleSelection}>
            <option value="none">Choisir une notion</option>
            <option value="all">Afficher tout</option>
            {notions.map((notion) => {
                return (
                    <option value={notion} key={notion}>{notion}</option>
                )
            })}
        </select>
    )
}

function selectAuthor(){
    let authors = [];
    for (let i = 0; i < definition.citations.length; i++) {
        let j = definition.citations[i].auteur;
        if (!authors.includes(j)){
            authors.push(definition.citations[i].auteur);
        }
    }
    return (
        <select name="author" id="author-select" onChange={handleSelection}>
            <option value="none">Choisir un auteur</option>
            <option value="all">Afficher tout</option>
            {authors.map((author) => {
                return (
                    <option value={author} key={author}>{author}</option>
                )
            })}
        </select>
    )
}

function sortCitationByAuthor(a : Citation, b : Citation){
    if (a.auteur < b.auteur) return -1;
    if (a.auteur > b.auteur) return 1;
    return 0;
}

const citation_renderer : ReactNode = definition.citations.sort(sortCitationByAuthor).map((citation) => {
    if ("latin" in citation){
        return (
            <div key={citation.citation} data-notion={citation.notion} data-auteur={citation.auteur}>
                <p className={style.citation}>
                <span className={style.latin}>«{citation.latin}»</span><br />
                <span className={style.citation}>{citation.citation}</span><br /><span className={style.ouvrage}>  {citation.ouvrage}</span> — <span className={style.definition}>{citation.auteur}</span></p>
            </div>
        );
    }
    else {
        return (
            <div key={citation.citation} data-notion={citation.notion} data-auteur={citation.auteur}>
                <p className={style.citation}><span className={style.citation}>{citation.citation}</span><br /><span className={style.ouvrage}>  {citation.ouvrage}</span> — <span className={style.definition}>{citation.auteur}</span></p>
            </div>
        );
    }
});

export default function renderer(){
    return (
        <div>
            {navbar()}
            <main>
                <h2>Citations:</h2>
                {selectAuthor()}
                {getOnlyNotion()}
                {citation_renderer}
            </main>
        </div> 
    )

}
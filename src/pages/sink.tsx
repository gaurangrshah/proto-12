import { NextPage } from 'next';
import type { FCwChildren, WithSEO } from '@/types';

import { DefaultLayout } from '@/components/_scaffold/layouts';

import { bebas, inter } from '@/utils/fonts';

const Sink: NextPage<{
  full?: boolean;
  btns: React.ReactNode[];
  children: React.ReactNode;
}> = ({ full, children, ...props }) => {
  return (
    <DefaultLayout title="" btns={[]}>
      <div
        className={`${full ? '' : 'my-6 p-6'} ${inter.variable} ${
          bebas.variable
        } flex-center prose relative flex-col font-sans dark:prose-invert`}
      >
        <section>
          <hgroup className="font-dec">
            <h1>h1 HTML5 Kitchen Sink</h1>
            <h2>
              h2 Back in my quaint{' '}
              <a href="#" className="link">
                garden
              </a>
            </h2>
            <h3>
              h3 Jaunty{' '}
              <a href="#" className="link">
                zinnias
              </a>
              vie with flaunting phlox
            </h3>
            <h4>
              h4 Five or six big jet planes zoomed quickly by the new tower.
            </h4>
            <h5>
              h5 Expect skilled signwriters to use many jazzy, quaint old
              alphabets effectively.
            </h5>
            <h6>h6 Pack my box with five dozen liquor jugs.</h6>
          </hgroup>
        </section>
        <hr />
        <section>
          <header>
            <nav>
              <ul className="flex gap-2 py-4">
                <li className="nav-link text-base">
                  <a href="#">Home</a>
                </li>
                <li className="nav-link text-base">
                  <a href="#">About</a>
                </li>
                <li className="nav-link text-base">
                  <a href="#">Contact</a>
                </li>
              </ul>
            </nav>
          </header>
          <article>
            <p>
              This paragraph is nested inside an article. It contains many
              different, sometimes useful,{' '}
              <a href="https://www.w3schools.com/tags/">HTML5 tags</a>. Of
              course there are classics like <em>emphasis</em>,{' '}
              <strong>strong</strong>, and <small>small</small> but there are
              many others as well. Hover the following text for abbreviation
              tag: <abbr title="abbreviation">abbr</abbr>.
              {/* Similarly, you can use acronym tag like this: <acronym title="For The Win">ftw</acronym>.  */}
              You can define <del>deleted text</del> which often gets replaced
              with <ins>inserted</ins> text.
            </p>
            <p>
              You can also use <kbd>keyboard text</kbd>, which sometimes is
              styled similarly to the <code>&lt;code&gt;</code> or{' '}
              <samp>samp</samp> tags. Even more specifically, there is a tag
              just for <var>variables</var>. Not to be mistaken with blockquotes
              below, the quote tag lets you denote something as{' '}
              <q>quoted text</q>. Lastly don&apos;t forget the sub (H
              <sub>2</sub>O) and sup (E = MC<sup>2</sup>) tags.{' '}
            </p>
          </article>
          <aside>This is an aside.</aside>
          <footer>This is footer for this section</footer>
        </section>
        <hr />
        <section>
          <blockquote>
            <p>
              Blockquote: I quickly explained that many big jobs involve few
              hazards
            </p>
          </blockquote>
          <blockquote>
            <p>
              This is a mult-line blockquote with a cite reference. People think
              focus means saying yes to the thing you’ve got to focus on. But
              that’s not what it means at all. It means saying no to the hundred
              other good ideas that there are. You have to pick carefully. I’m
              actually as proud of the things we haven’tdone as the things I
              have done. Innovation is saying no to 1,000 things.
              <cite>
                Steve Jobs – Apple Worldwide Developers’ Conference, 1997
              </cite>
            </p>
          </blockquote>
        </section>
        <hr />
        <section>
          <table>
            <caption>Tables can have captions now.</caption>
            <tbody>
              <tr>
                <th>Person</th>
                <th>Number</th>
                <th>Third Column</th>
              </tr>
              <tr>
                <td>Someone Lastname</td>
                <td>900</td>
                <td>Nullam quis risus eget urna mollis ornare vel eu leo.</td>
              </tr>
              <tr>
                <td>
                  <a href="#">Person Name</a>
                </td>
                <td>1200</td>
                <td>
                  Vestibulum id ligula porta felis euismod semper. Donec
                  ullamcorper nulla non metus auctor fringilla.
                </td>
              </tr>
              <tr>
                <td>Another Person</td>
                <td>1500</td>
                <td>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                  auctor. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </td>
              </tr>
              <tr>
                <td>Last One</td>
                <td>2800</td>
                <td>
                  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  Cras mattis consectetur purus sit amet fermentum.
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <hr />
        <section>
          <dl>
            <dt>Definition List Title</dt>
            <dd>Definition list division.</dd>
            <dt>Kitchen Sink</dt>
            <dd>
              Used in expressions to describe work in which all conceivable (and
              some inconceivable) sources have been mined. In this case, a bunch
              of markup.
            </dd>
            <dt>aside</dt>
            <dd>Defines content aside from the page content</dd>
            <dt>blockquote</dt>
            <dd>Defines a section that is quoted from another source</dd>
          </dl>
        </section>
        <hr />
        <section>
          <ul>
            <li>
              Unordered List item one
              <ul>
                <li>
                  Nested list item
                  <ul>
                    <li>Level 3, item one</li>
                    <li>Level 3, item two</li>
                    <li>Level 3, item three</li>
                    <li>Level 3, item four</li>
                  </ul>
                </li>
                <li>List item two</li>
                <li>List item three</li>
                <li>List item four</li>
              </ul>
            </li>
            <li>List item two</li>
            <li>List item three</li>
            <li>List item four</li>
          </ul>
          <hr />
          <ol>
            <li>
              List item one
              <ol>
                <li>
                  List item one
                  <ol>
                    <li>List item one</li>
                    <li>List item two</li>
                    <li>List item three</li>
                    <li>List item four</li>
                  </ol>
                </li>
                <li>List item two</li>
                <li>List item three</li>
                <li>List item four</li>
              </ol>
            </li>
            <li>List item two</li>
            <li>List item three</li>
            <li>List item four</li>
          </ol>
        </section>
        <hr />
        <section>
          <address>
            1 Infinite Loop
            <br />
            Cupertino, CA 95014
            <br />
            United States
          </address>
        </section>
        <hr />
        <section>
          <pre>
            {`pre {
              display: block;
              padding: 7px;
              background-color: #F5F5F5;
              border: 1px solid #E1E1E8;
              border-radius: 3px;
              white-space: pre-wrap;
              word-break: break-all;
              font-family: Menlo, Monaco;
              line-height: 160%;
            }`}
          </pre>
        </section>
        <hr />

        <figure>
          <img src="https://picsum.photos/500" />
          <figcaption>
            Fig1. A random picture from{' '}
            <a href="https://www.picsum.com/">picsum.com</a>
          </figcaption>
        </figure>

        <hr />
        <section>
          <form>
            <p>
              <label htmlFor="example-input-email">Email address</label>
              <input
                type="email"
                id="example-input-email"
                placeholder="Enter email"
              />
            </p>
            <p>
              <label htmlFor="example-input-password1">Number</label>
              <input
                type="number"
                id="example-input-number"
                placeholder="Number"
              />
            </p>
            <p>
              <label htmlFor="example-input-password">Password</label>
              <input
                type="password"
                id="example-input-password"
                placeholder="Password"
              />
            </p>
            <p>
              <label htmlFor="example-input-search">Search</label>
              <input
                type="search"
                id="example-input-serach"
                placeholder="Search .."
              />
            </p>
            <p>
              <label htmlFor="example-input-tel">Telephone number</label>
              <input
                type="tel"
                id="example-input-tel"
                placeholder="Telephone number"
              />
            </p>

            <p>
              <label htmlFor="example-input-text">Text</label>
              <input
                type="text"
                id="example-input-text"
                placeholder="Enter some text here"
              />
            </p>
            <p>
              <label htmlFor="example-input-url">Url</label>
              <input
                type="url"
                id="example-input-url"
                placeholder="Enter a url here"
              />
            </p>
            <p>
              <label htmlFor="example-input-color">Color</label>
              <input type="color" id="example-inupt-color" placeholder="#fff" />
            </p>
            <p>
              <label htmlFor="example-input-date">Date</label>
              <input type="date" id="example-input-date" placeholder="date" />
            </p>
            <p>
              <label htmlFor="example-input-date-time">Date / Time</label>
              <input
                type="datetime"
                id="example-input-date-time"
                placeholder="date / time"
              />
            </p>
            <p>
              <label htmlFor="example-input-date-time-local">
                Date / Time local
              </label>
              <input
                type="datetime-local"
                id="example-input-date-time-local"
                placeholder="date / time local"
              />
            </p>
            <p>
              <label htmlFor="example-input-month">Month</label>
              <input
                type="month"
                id="example-input-month"
                placeholder="Month"
              />
            </p>
            <p>
              <label htmlFor="example-input-week">Week</label>
              <input type="week" id="example-input-week" placeholder="Week" />
            </p>
            <p>
              <label htmlFor="example-input-time">Time</label>
              <input type="time" id="example-input-time" placeholder="Time" />
            </p>
            <p>
              <label htmlFor="example-select1">Example select</label>
              <select id="example-select1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </p>
            <p>
              <label htmlFor="example-select2">Example multiple select</label>
              <select multiple id="example-select2">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </p>
            <p>
              <label htmlFor="example-textarea">Example textarea</label>
              <textarea id="example-textarea" rows={3}></textarea>
            </p>
            <p>
              <label htmlFor="example-input-file">File input</label>
              <input type="file" id="example-input-file" />
            </p>
            <fieldset>
              <legend>I am legend</legend>
              <div>
                <label>
                  <input
                    type="radio"
                    name="options-radios"
                    id="optionsR-radios1"
                    value="option1"
                    checked
                    readOnly
                  />{' '}
                  Option one is this and that&mdash;be sure to include why
                  it&apos;s great
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="radio"
                    name="options-radios"
                    id="options-radios2"
                    value="option2"
                  />{' '}
                  Option two can be something else and selecting it will
                  deselect option one
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="optionsRadios"
                    id="options-radios3"
                    value="option3"
                    disabled
                  />{' '}
                  Option three is disabled
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>I am also legend</legend>
              <input type="checkbox" /> Check me out
              <input type="checkbox" /> Or check me out
            </fieldset>
            <p>
              <button type="button" name="button">
                Button
              </button>
              <input type="button" name="input" value="Input Button" />
              <input type="submit" name="submit" value="Submit Button" />
              <input type="reset" name="reset" value="Reset Button" />
            </p>
          </form>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default Sink;
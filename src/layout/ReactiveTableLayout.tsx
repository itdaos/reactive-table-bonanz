import ReactiveTable from "../components/reactive-table/ReactiveTable";

function ReactiveTableLayout() {
    return (
        <>
            <header className="header">
                <h1>Reactive Table Demo</h1>

            </header>
            <main>
                <ReactiveTable></ReactiveTable>
            </main>
        </>
    );
}

export default ReactiveTableLayout;
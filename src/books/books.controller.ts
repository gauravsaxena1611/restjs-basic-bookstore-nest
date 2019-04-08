import { Controller, Get, Param, Post, Body, Query, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';

@Controller('books')
export class BooksController {

    // inject the BooksService into the controller
    constructor(private booksService: BooksService) { }

    @Get()
    /** map any GET request sent to /books to this controller */
    async getBooks() {
        const books = await this.booksService.getBooks();
        return books;
    }

    @Get(':bookID')
    async getBook(@Param('bookID') bookID) {
        const book = await this.booksService.getBook(bookID);
        return book;
    }

    @Post()
    async addBook(@Body() createBookDTO: CreateBookDTO) {
        const book = await this.booksService.addBook(createBookDTO);
        return book;
    }

    @Delete()
    /** delete a book by passing the bookID as a query parameter */
    async deleteBook(@Query() query) {
        const books = await this.booksService.deleteBook(query.bookID);
        return books;
    }
}


/** Here in this controller, 
 * first, the important modules were imported from @nestjs/common, and 
 * you also import both the BooksService and CreateBookDTO respectively. 
 * 
 * CreateBookDTO is a data transfer object, a TypeScript class created for type-checking and to define the structures of what an object looks like when creating a new book. We will create this DTO in a bit.
 * 
 * Next, you used constructor to inject the BooksService into the controller and created four 
 * different methods which are:
 * 1.	getBooks(): Used to fetch the list of all books. It has @Get() decorator attached to it. 
 *                  This helps to map any GET request sent to /books to this controller.
 * 2.	getBook(): Used to retrieve the details of a particular book by passing the bookID as a parameter.
 * 3.	addBook(): Used to create and post a new book to the existing book list. 
 *                 And because we are not persisting into the database, 
 *                 the newly added book will only be held in memory.
 * 4.	deleteBook(): Used to delete a book by passing the bookID as a query parameter.
 * 
 * Each of the methods has a special decorator attached to it, which makes it very easy to route each 
 * HTTP request to a specific method within the controller.
 */